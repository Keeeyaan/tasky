/*
  Warnings:

  - The values [URGENT,HIGH,NORMAL,LOW] on the enum `Priority` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - You are about to alter the column `description` on the `Task` table. The data in that column could be lost. The data in that column will be cast from `VarChar(1032)` to `VarChar(1024)`.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('started', 'in_progress', 'completed');

-- AlterEnum
BEGIN;
CREATE TYPE "Priority_new" AS ENUM ('urgent', 'high', 'normal', 'low');
ALTER TABLE "Task" ALTER COLUMN "priority" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "priority" TYPE "Priority_new" USING ("priority"::text::"Priority_new");
ALTER TYPE "Priority" RENAME TO "Priority_old";
ALTER TYPE "Priority_new" RENAME TO "Priority";
DROP TYPE "Priority_old";
ALTER TABLE "Task" ALTER COLUMN "priority" SET DEFAULT 'low';
COMMIT;

-- AlterTable
ALTER TABLE "Task" DROP COLUMN "completed",
ADD COLUMN     "status" "Status" DEFAULT 'started',
ADD COLUMN     "tag" TEXT,
ALTER COLUMN "priority" SET DEFAULT 'low',
ALTER COLUMN "description" SET DATA TYPE VARCHAR(1024);
