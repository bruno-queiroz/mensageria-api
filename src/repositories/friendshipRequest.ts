import { and, eq } from "drizzle-orm";
import { db } from "../app";
import { friendshipRequest } from "../db/schema/friendshipRequest";
import { FriendshipRequestDto } from "../validators/FriendshipRequest";
import { user } from "../db/schema/user";

export const friendshipRequestRepository = {
  async create(request: FriendshipRequestDto) {
    return await db.insert(friendshipRequest).values(request);
  },
  async getByUserId(userId: string) {
    console.log("userId", userId);
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
};
