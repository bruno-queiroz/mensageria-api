ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "id" SET DATA TYPE uuid USING (gen_random_uuid()); --> statement-breakpoint
ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT gen_random_uuid();
ALTER TABLE "user" ADD COLUMN "created_at" timestamp;