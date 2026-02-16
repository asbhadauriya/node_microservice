/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[phoneNumber]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('POSTED', 'ACCEPTED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "phoneNumber" TEXT,
ALTER COLUMN "role" SET DEFAULT 'customer';

-- CreateTable
CREATE TABLE "Job" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "worker_id" TEXT,
    "category_id" INTEGER,
    "description" TEXT,
    "budget" DOUBLE PRECISION,
    "status" "JobStatus" NOT NULL DEFAULT 'POSTED',
    "scheduled_date" TIMESTAMP(3),
    "address" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phoneNumber_key" ON "User"("phoneNumber");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_worker_id_fkey" FOREIGN KEY ("worker_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
