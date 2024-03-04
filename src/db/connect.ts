import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import env from "dotenv";
env.config();

export const connectDb = () => {
  const pool = new Pool({
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  });

  console.log("connect db");
  return drizzle(pool);
};
