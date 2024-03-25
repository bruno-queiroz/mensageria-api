import { eq } from "drizzle-orm";
import { db } from "../app";
import { session } from "../db/schema/session";

interface CreateUserSession {
  userId: string;
  sessionToken: string;
  expires: Date;
}

export const sessionRepository = {
  async getUserSession(sessionToken: string) {
    return await db
      .select({ expires: session.expires, userId: session.userId })
      .from(session)
      .where(eq(session.sessionToken, sessionToken));
  },
  async createUserSession(newSession: CreateUserSession) {
    return await db.insert(session).values(newSession);
  },
};
