import { db } from "../app";
import { and, eq, like, not, notInArray, or } from "drizzle-orm";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";
import { unionAll } from "drizzle-orm/pg-core";
import { friendshipRequest } from "../db/schema/friendshipRequest";

export const friendRepository = {
  async getFriends(myId: string, friendId: string) {
    return await db.select().from(friendship);
  },
  async findFriend(userId: string, query: string) {
    const invitee = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.userInvitee, user.id))
      .where(eq(friendship.userInviter, userId));

    const inviter = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.userInviter, user.id))
      .where(eq(friendship.userInvitee, userId));

    const userFriendsQuery = unionAll(invitee, inviter);

    const sq = db
      .select()
      .from(friendshipRequest)
      .where(
        or(
          eq(friendshipRequest.toUser, userId),
          eq(friendshipRequest.fromUser, userId)
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
          not(eq(user.id, userId))
        )
      );
  },
};
