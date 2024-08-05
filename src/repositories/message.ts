import { and, desc, eq, lt } from "drizzle-orm";
import { db } from "../app";
import { privateMessage } from "../db/schema/privateMessage";
import { SendMessageDto } from "../validators/SendMessage";
import { user } from "../db/schema/user";

export const messageRepository = {
  async send(message: SendMessageDto & { conversationId: string }) {
    return await db.insert(privateMessage).values(message);
  },
  async get(conversationId: string, toUserId: string, date: string) {
    return await db.transaction(async (tx) => {
      const queryResult = await tx
        .update(privateMessage)
        .set({ isSeen: true })
        .where(
          and(
            eq(privateMessage.fromUser, toUserId),
            eq(privateMessage.isSeen, false)
          )
        );

      const messages = await tx
        .select({
          toUser: privateMessage.toUser,
          fromUser: privateMessage.fromUser,
          message: privateMessage.message,
          sentAt: privateMessage.sentAt,
          isSeen: privateMessage.isSeen,
        })
        .from(privateMessage)
        .orderBy(desc(privateMessage.sentAt))
        .limit(50)
        .where(
          and(
            eq(privateMessage.conversationId, conversationId),
            lt(privateMessage.sentAt, new Date(date))
          )
        );

      const fromUser = await tx
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
        })
        .from(user)
        .where(eq(user.id, toUserId));

      return {
        user: fromUser[0],
        messages,
        isRowModified: !!queryResult.rowCount,
      };
    });
  },
  async getNotSeen(conversationId: string, toUserId: string) {
    return await db.transaction(async (tx) => {
      const messages = await tx
        .select({
          toUser: privateMessage.toUser,
          fromUser: privateMessage.fromUser,
          message: privateMessage.message,
          sentAt: privateMessage.sentAt,
          isSeen: privateMessage.isSeen,
        })
        .from(privateMessage)
        .orderBy(desc(privateMessage.sentAt))
        .limit(1)
        .where(
          and(
            eq(privateMessage.conversationId, conversationId),
            eq(privateMessage.isSeen, false)
          )
        );

      const fromUser = await tx
        .select({
          id: user.id,
          name: user.name,
          image: user.image,
        })
        .from(user)
        .where(eq(user.id, toUserId));

      const queryResult = await tx
        .update(privateMessage)
        .set({ isSeen: true })
        .where(
          and(
            eq(privateMessage.fromUser, toUserId),
            eq(privateMessage.isSeen, false)
          )
        );

      return {
        user: fromUser[0],
        messages,
        isRowModified: !!queryResult.rowCount,
      };
    });
  },
};
