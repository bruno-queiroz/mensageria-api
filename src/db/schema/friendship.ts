import { pgTable, text, timestamp, primaryKey } from "drizzle-orm/pg-core";
import { user } from "./user";

export const friendship = pgTable(
  "friendship",
  {
    userInviter: text("user_inviter").references(() => user.id),
    userInvitee: text("user_invitee").references(() => user.id),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.userInviter, table.userInvitee] }),
    };
  }
);
