import { db } from "../app";
import { user } from "../db/schema/user";

type NewUser = typeof user.$inferInsert;

export const userRepository = {
  async signUpUser(newUser: NewUser) {
    return await db.insert(user).values(newUser).returning({
      id: user.name,
      name: user.name,
      email: user.email,
      photo: user.photo,
      createdAt: user.createdAt,
    });
  },
};
