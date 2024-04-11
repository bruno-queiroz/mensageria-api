import { pgTable, text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { user } from "./user";

export const privateMessage = pgTable(
  "private_message",
  {
    conversationId: text("conversation_id").primaryKey(),
    toUser: text("to_user").references(() => user.id),
    fromUser: text("from_user").references(() => user.id),
    message: text("message").notNull(),
    isSeen: boolean("is_seen").default(false),
    sentAt: timestamp("sent_at").defaultNow(),
  },
  (table) => {
    return {
      sentAtIndex: index("sent_at_index").on(table.sentAt),
    };
  }
);
