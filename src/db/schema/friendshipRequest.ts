import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./user";

export const friendshipRequest = pgTable("friendship_request", {
  toUser: text("to_user").references(() => user.id),
  fromUser: text("from_user").references(() => user.id),
  isAccept: boolean("is_accept").default(false),
  sentAt: timestamp("sent_at").defaultNow(),
});
