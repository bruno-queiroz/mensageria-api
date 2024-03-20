import { sql } from "drizzle-orm";
import { text, pgTable, timestamp } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  image: text("image"),
  email: text("email").notNull(),
  emailVerified: timestamp("emailVerified", { mode: "date" }),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow(),
});
