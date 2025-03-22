/*
  Warnings:

  - You are about to drop the column `created_Time` on the `refreshtokens` table. All the data in the column will be lost.
  - You are about to drop the column `expire_Time` on the `refreshtokens` table. All the data in the column will be lost.
  - You are about to drop the column `revoked_Time` on the `refreshtokens` table. All the data in the column will be lost.
  - Added the required column `expire_at` to the `refreshtokens` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "refreshtokens" DROP COLUMN "created_Time",
DROP COLUMN "expire_Time",
DROP COLUMN "revoked_Time",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "expire_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "revoked_at" TIMESTAMP(3);
