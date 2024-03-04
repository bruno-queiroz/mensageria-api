import { migrate } from "drizzle-orm/node-postgres/migrator";
import { connectDb } from "./connect";

migrate(connectDb(), { migrationsFolder: "./drizzle" });
