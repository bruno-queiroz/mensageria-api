import { pgTable, uuid, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user";

export const friendship = pgTable(
  "friendship",
  {
    user_inviter: uuid("user_inviter").references(() => user.id),
    user_invitee: uuid("user_invitee").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.user_inviter, table.user_invitee] }),
    };
  }
);
