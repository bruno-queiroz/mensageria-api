DROP TABLE "friendship";--> statement-breakpoint
ALTER TABLE "user" RENAME COLUMN "photo" TO "image";--> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "emailVerified" timestamp;