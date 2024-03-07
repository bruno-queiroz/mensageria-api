import { text, pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  photo: text("photo"),
  email: text("email").notNull(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});
