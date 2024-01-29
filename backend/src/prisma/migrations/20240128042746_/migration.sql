/*
  Warnings:

  - You are about to alter the column `content` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1032)`.

*/
-- CreateEnum
CREATE TYPE "Priority" AS ENUM ('URGENT', 'HIGH', 'NORMAL', 'LOW');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "priority" "Priority" NOT NULL DEFAULT 'LOW',
ALTER COLUMN "content" SET DATA TYPE VARCHAR(1032);
