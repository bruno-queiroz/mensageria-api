import { eq } from "drizzle-orm";
import { db } from "../app";
import { session } from "../db/schema/session";

export const sessionRepository = {
  async getUserSession(sessionToken: string) {
    return await db
      .select({ expires: session.expires, userId: session.userId })
      .from(session)
      .where(eq(session.sessionToken, sessionToken));
  },
};
