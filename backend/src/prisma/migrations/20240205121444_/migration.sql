/*
  Warnings:

  - You are about to drop the column `content` on the `Task` table. All the data in the column will be lost.
  - Added the required column `description` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP COLUMN "content",
ADD COLUMN     "completed" BOOLEAN DEFAULT false,
ADD COLUMN     "description" VARCHAR(1032) NOT NULL,
ALTER COLUMN "title" SET NOT NULL;
