CREATE TABLE IF NOT EXISTS "friendship_request" (
	"to_user" text,
	"from_user" text,
	"is_accept" boolean DEFAULT false,
	"sent_at" timestamp DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendship_request" ADD CONSTRAINT "friendship_request_to_user_user_id_fk" FOREIGN KEY ("to_user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendship_request" ADD CONSTRAINT "friendship_request_from_user_user_id_fk" FOREIGN KEY ("from_user") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
