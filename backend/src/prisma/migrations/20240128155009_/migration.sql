/*
  Warnings:

  - You are about to drop the column `ownerId` on the `RefreshToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RefreshToken" DROP CONSTRAINT "RefreshToken_ownerId_fkey";

-- AlterTable
ALTER TABLE "RefreshToken" DROP COLUMN "ownerId",
ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userId_fkey" FOREIGN KEY ("userId") REFERENCES "RefreshToken"("id") ON DELETE SET NULL ON UPDATE CASCADE;
