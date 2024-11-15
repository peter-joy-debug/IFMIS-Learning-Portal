/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `faqs` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `replies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `tickets` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "uts"."replies" DROP CONSTRAINT "replies_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "uts"."replies" DROP CONSTRAINT "replies_userId_fkey";

-- DropForeignKey
ALTER TABLE "uts"."tickets" DROP CONSTRAINT "tickets_senderId_fkey";

-- AlterTable
ALTER TABLE "user_schema_uts"."users" DROP CONSTRAINT "users_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");
-- DROP SEQUENCE "users_id_seq";
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_sequences WHERE schemaname = 'public' AND sequencename = 'users_id_seq') THEN
    DROP SEQUENCE "public"."users_id_seq";
  END IF;
END $$;

-- AlterTable
ALTER TABLE "uts"."faqs" DROP CONSTRAINT "faqs_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "faqs_pkey" PRIMARY KEY ("id");
-- DROP SEQUENCE "faqs_id_seq";

-- AlterTable
ALTER TABLE "uts"."replies" DROP CONSTRAINT "replies_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "ticketId" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "replies_pkey" PRIMARY KEY ("id");
-- DROP SEQUENCE "replies_id_seq";

-- AlterTable
ALTER TABLE "uts"."tickets" DROP CONSTRAINT "tickets_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "senderId" SET DATA TYPE TEXT,
ALTER COLUMN "assignedTo" SET DATA TYPE TEXT[],
ALTER COLUMN "shared" SET DATA TYPE TEXT[],
ADD CONSTRAINT "tickets_pkey" PRIMARY KEY ("id");
-- DROP SEQUENCE "tickets_id_seq";

-- AddForeignKey
ALTER TABLE "uts"."tickets" ADD CONSTRAINT "tickets_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user_schema_uts"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uts"."replies" ADD CONSTRAINT "replies_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "uts"."tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uts"."replies" ADD CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema_uts"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
