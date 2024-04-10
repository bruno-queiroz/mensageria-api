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
        id: user.id,
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
  async findUserByEmail(email: string) {
    return await db
      .select({ encryptedPw: user.password, userId: user.id })
      .from(user)
      .where(eq(user.email, email));
  },
};
