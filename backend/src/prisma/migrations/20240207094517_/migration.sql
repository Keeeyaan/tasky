/*
  Warnings:

  - You are about to alter the column `tag` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(128)`.

*/
-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "tag" SET DATA TYPE VARCHAR(128);
