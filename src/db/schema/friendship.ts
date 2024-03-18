import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user";

export const friendship = pgTable(
  "friendship",
  {
    user_inviter: text("user_inviter").references(() => user.id),
    user_invitee: text("user_invitee").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.user_inviter, table.user_invitee] }),
    };
  }
);
