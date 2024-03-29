import { and, eq, like, notInArray } from "drizzle-orm";
import { db } from "../app";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";
import { unionAll } from "drizzle-orm/pg-core";
import { session } from "../db/schema/session";
import { SignUpUserDTO } from "../validators/SignUpUser";

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

    return await db
      .select({
        id: user.id,
        name: user.name,
        image: user.image,
      })
      .from(user)
      .where(
        and(like(user.name, query + "%"), notInArray(user.id, userFriendsQuery))
      );
  },
  async findUserByEmail(email: string) {
    return await db
      .select({ encryptedPw: user.password, userId: user.id })
      .from(user)
      .where(eq(user.email, email));
  },
};
