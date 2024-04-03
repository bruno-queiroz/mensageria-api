import { and, eq, like, not, notInArray, or } from "drizzle-orm";
import { db } from "../app";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";
import { unionAll } from "drizzle-orm/pg-core";
import { session } from "../db/schema/session";
import { SignUpUserDTO } from "../validators/SignUpUser";
import { friendshipRequest } from "../db/schema/friendshipRequest";

export const userRepository = {
  async signUpUser(
    newUser: SignUpUserDTO & { id: string },
    sessionToken: string,
    expireDate: Date
  ) {
    const userData = await db.transaction(async (tx) => {
      const [userData] = await tx.insert(user).values(newUser).returning({
        id: user.name,
        name: user.name,
        email: user.email,
        image: user.image,
        createdAt: user.createdAt,
      });

      await tx
        .insert(session)
        .values({ sessionToken, expires: expireDate, userId: newUser.id });

      return userData;
    });

    return userData;
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
  async findUserByEmail(email: string) {
    return await db
      .select({ encryptedPw: user.password, userId: user.id })
      .from(user)
      .where(eq(user.email, email));
  },
};
