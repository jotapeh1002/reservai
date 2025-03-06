/*
  Warnings:

  - The `price_range` column on the `restaurant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('gourmet', 'economico', 'luxo', 'normal', 'moderado');

-- AlterTable
ALTER TABLE "restaurant" DROP COLUMN "price_range",
ADD COLUMN     "price_range" "PriceRange"[];

-- DropEnum
DROP TYPE "priceRange";
