import { db } from "../app";
import {
  and,
  count,
  desc,
  eq,
  like,
  max,
  not,
  notInArray,
  or,
  sql,
} from "drizzle-orm";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";
import { unionAll } from "drizzle-orm/pg-core";
import { friendshipRequest } from "../db/schema/friendshipRequest";
import { privateMessage } from "../db/schema/privateMessage";

export const friendRepository = {
  async getFriends(myId: string) {
    const subQuery = db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        message_amount: count(
          sql`CASE
                WHEN "private_message".is_seen = \'f\'
                    AND "private_message".from_user != ${myId} THEN 1
                ELSE NULL
            END
          `
        ).as("message_amount"),
        last_message: max(privateMessage.message).as("last_message"),
        last_message_sent_at: max(privateMessage.sentAt).as(
          "last_message_sent_at"
        ),
      })
      .from(user)
      .innerJoin(
        friendship,
        or(
          and(
            eq(friendship.userInvitee, myId),
            eq(friendship.userInviter, user.id)
          ),
          and(
            eq(friendship.userInvitee, user.id),
            eq(friendship.userInviter, myId)
          )
        )
      )
      .leftJoin(
        privateMessage,
        or(
          and(
            eq(privateMessage.fromUser, user.id),
            eq(privateMessage.toUser, myId)
          ),
          and(
            eq(privateMessage.fromUser, myId),
            eq(privateMessage.toUser, user.id)
          )
        )
      )
      .groupBy(sql`${user.id}`)
      .as("sq");

    return await db
      .select({
        id: subQuery.id,
        name: subQuery.name,
        image: subQuery.image,
        message_amount: subQuery.message_amount,
        last_message: privateMessage.message,
        last_message_sent_at: subQuery.last_message_sent_at,
      })
      .from(subQuery)
      .orderBy(desc(subQuery.last_message_sent_at))
      .innerJoin(
        privateMessage,
        eq(subQuery.last_message_sent_at, privateMessage.sentAt)
      );
  },
  async findFriend(myId: string, query: string) {
    const invitee = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.userInvitee, user.id))
      .where(eq(friendship.userInviter, myId));

    const inviter = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.userInviter, user.id))
      .where(eq(friendship.userInvitee, myId));

    const userFriendsQuery = unionAll(invitee, inviter);

    const sq = db
      .select()
      .from(friendshipRequest)
      .where(
        or(
          eq(friendshipRequest.toUser, myId),
          eq(friendshipRequest.fromUser, myId)
        )
      )
      .as("sq");

    return await db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
        fromUser: sq.fromUser,
        toUser: sq.toUser,
        isAccept: sq.isAccept,
      })
      .from(user)
      .leftJoin(sq, or(eq(sq.toUser, user.id), eq(sq.fromUser, user.id)))
      .where(
        and(
          like(user.name, query + "%"),
          notInArray(user.id, userFriendsQuery),
          not(eq(user.id, myId))
        )
      );
  },
};
