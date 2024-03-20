import { and, eq, like, notInArray } from "drizzle-orm";
import { db } from "../app";
import { user } from "../db/schema/user";
import { friendship } from "../db/schema/friendship";
import { unionAll } from "drizzle-orm/pg-core";

type NewUser = typeof user.$inferInsert;

export const userRepository = {
  async signUpUser(newUser: NewUser) {
    return await db.insert(user).values(newUser).returning({
      id: user.name,
      name: user.name,
      email: user.email,
      photo: user.image,
      createdAt: user.createdAt,
    });
  },
  async findFriend(userId: string, query: string) {
    const invitee = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.user_invitee, user.id))
      .where(eq(friendship.user_inviter, userId));

    const inviter = db
      .select({ id: user.id })
      .from(friendship)
      .innerJoin(user, eq(friendship.user_inviter, user.id))
      .where(eq(friendship.user_invitee, userId));

    const userFriendsQuery = unionAll(invitee, inviter);

    return await db
      .select({
        id: user.id,
        name: user.name,
        photo: user.image,
      })
      .from(user)
      .where(
        and(like(user.name, query + "%"), notInArray(user.id, userFriendsQuery))
      );
  },
};
