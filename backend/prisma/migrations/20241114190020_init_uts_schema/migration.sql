/*
  Warnings:

  - You are about to drop the `FAQ` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Reply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "user_schema_uts";

-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "uts";

-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_ticketId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Reply" DROP CONSTRAINT "Reply_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."Ticket" DROP CONSTRAINT "Ticket_senderId_fkey";

-- DropTable
DROP TABLE "public"."FAQ";

-- DropTable
DROP TABLE "public"."Reply";

-- DropTable
DROP TABLE "public"."Ticket";

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "user_schema_uts"."users" (
    "id" SERIAL NOT NULL,
    "firstname" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "department" TEXT[],
    "role" TEXT NOT NULL,
    "avatar" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Active',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uts"."tickets" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "subject" TEXT NOT NULL,
    "detail" TEXT NOT NULL,
    "assignedTo" INTEGER[],
    "status" TEXT NOT NULL DEFAULT 'Received',
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "attachments" TEXT[],
    "department" TEXT[],
    "shared" INTEGER[],
    "visibility" TEXT NOT NULL DEFAULT 'Visible',

    CONSTRAINT "tickets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uts"."replies" (
    "id" SERIAL NOT NULL,
    "ticketId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "detail" TEXT NOT NULL,
    "attachments" TEXT[],
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "replies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "uts"."faqs" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "faqs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "user_schema_uts"."users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "user_schema_uts"."users"("email");

-- AddForeignKey
ALTER TABLE "uts"."tickets" ADD CONSTRAINT "tickets_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "user_schema_uts"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uts"."replies" ADD CONSTRAINT "replies_ticketId_fkey" FOREIGN KEY ("ticketId") REFERENCES "uts"."tickets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "uts"."replies" ADD CONSTRAINT "replies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user_schema_uts"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
