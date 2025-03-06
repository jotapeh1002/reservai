/*
  Warnings:

  - Made the column `user_id` on table `restaurant` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "restaurant" DROP CONSTRAINT "restaurant_user_id_fkey";

-- AlterTable
ALTER TABLE "restaurant" ALTER COLUMN "user_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
