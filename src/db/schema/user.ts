import { text, pgTable, uuid, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: uuid("id").primaryKey(),
  name: text("name"),
  photo: text("photo"),
  email: text("email"),
  password: text("password"),
  createdAt: timestamp("created_at"),
});
