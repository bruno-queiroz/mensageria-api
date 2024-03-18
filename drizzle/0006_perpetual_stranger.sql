CREATE TABLE IF NOT EXISTS "friendship" (
	"user_inviter" text,
	"user_invitee" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "friendship_user_inviter_user_invitee_pk" PRIMARY KEY("user_inviter","user_invitee")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user_inviter_user_id_fk" FOREIGN KEY ("user_inviter") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "friendship" ADD CONSTRAINT "friendship_user_invitee_user_id_fk" FOREIGN KEY ("user_invitee") REFERENCES "user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
