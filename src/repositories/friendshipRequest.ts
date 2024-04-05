import { and, eq } from "drizzle-orm";
import { db } from "../app";
import { friendshipRequest } from "../db/schema/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";

export const friendshipRequestRepository = {
  async create(request: FriendshipRequestDto) {
    return await db.insert(friendshipRequest).values(request);
  },
  async getByUserId(userId: string) {
    return await db
      .select({
        name: user.name,
        image: user.image,
        fromUser: friendshipRequest.fromUser,
        sentAt: friendshipRequest.sentAt,
      })
      .from(friendshipRequest)
      .innerJoin(user, eq(friendshipRequest.fromUser, user.id))
      .where(
        and(
          eq(friendshipRequest.toUser, userId),
          eq(friendshipRequest.isAccept, false)
        )
      );
  },
  async accept({ fromUser, toUser }: FriendshipRequestDto) {
    await db.transaction(async (tx) => {
      await tx
        .update(friendshipRequest)
        .set({ isAccept: true })
        .where(
          and(
            eq(friendshipRequest.fromUser, fromUser),
            eq(friendshipRequest.toUser, toUser)
          )
        );

      await tx
        .insert(friendship)
        .values({ userInvitee: toUser, userInviter: fromUser });
    });
  },
};
