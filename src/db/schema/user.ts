import { text, pgTable, serial } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey(),
  name: text("name"),
  photo: text("photo"),
  email: text("email"),
});
