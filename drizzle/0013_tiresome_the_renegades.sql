CREATE TABLE IF NOT EXISTS "private_message" (
	"id" text PRIMARY KEY NOT NULL,
	"to_user" text,
	"from_user" text,
	"message" text,
	"is_seen" boolean DEFAULT false,
	"sent_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sent_at_index" ON "private_message" ("sent_at");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private_message" ADD CONSTRAINT "private_message_to_user_user_id_fk" FOREIGN KEY ("to_user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "private_message" ADD CONSTRAINT "private_message_from_user_user_id_fk" FOREIGN KEY ("from_user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
