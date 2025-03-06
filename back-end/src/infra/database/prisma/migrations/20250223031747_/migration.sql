/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `restaurant` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "restaurant_user_id_key" ON "restaurant"("user_id");
