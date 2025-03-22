-- CreateEnum
CREATE TYPE "Available" AS ENUM ('disponivel', 'reservada');

-- CreateEnum
CREATE TYPE "PriceRange" AS ENUM ('gourmet', 'economico', 'luxo', 'normal', 'moderado');

-- CreateEnum
CREATE TYPE "DaysWeek" AS ENUM ('domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado');

-- CreateEnum
CREATE TYPE "PayMethod" AS ENUM ('dinheiro', 'debito', 'credito', 'pix');

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "photo" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "refreshtokens" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "expire_Time" TIMESTAMP(3) NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "revoked_Time" TIMESTAMP(3),
    "created_Time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "refreshtokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "favorite" (
    "id" TEXT NOT NULL,
    "user_id" TEXT,
    "restaurant_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "restaurant" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price_range" "PriceRange"[],
    "address" TEXT NOT NULL,
    "phone" TEXT,
    "open_days" "DaysWeek"[],
    "close_days" "DaysWeek"[],
    "opening_times" TEXT NOT NULL,
    "closing_times" TEXT NOT NULL,
    "photo" TEXT,
    "culinary_types" TEXT NOT NULL,
    "description" TEXT,
    "pay_methods" "PayMethod"[],
    "user_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "restaurant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "table" (
    "id" TEXT NOT NULL,
    "id_restaurant" TEXT,
    "quantities" INTEGER NOT NULL,
    "status_reserve" "Available" NOT NULL,

    CONSTRAINT "table_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tablereserve" (
    "id" TEXT NOT NULL,
    "table_id" TEXT,
    "user_id" TEXT,
    "restaurant_id" TEXT,
    "date_reserve" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tablereserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "available" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT,
    "available" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "available_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categorymenu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "categorymenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dishmenu" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DOUBLE PRECISION NOT NULL,
    "available" BOOLEAN,
    "evaluate" INTEGER,
    "urlImage" TEXT,
    "category_id" TEXT NOT NULL,

    CONSTRAINT "dishmenu_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_name_key" ON "user"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "refreshtokens_refreshToken_key" ON "refreshtokens"("refreshToken");

-- CreateIndex
CREATE UNIQUE INDEX "restaurant_user_id_key" ON "restaurant"("user_id");

-- AddForeignKey
ALTER TABLE "refreshtokens" ADD CONSTRAINT "refreshtokens_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "restaurant" ADD CONSTRAINT "restaurant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "table" ADD CONSTRAINT "table_id_restaurant_fkey" FOREIGN KEY ("id_restaurant") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablereserve" ADD CONSTRAINT "tablereserve_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablereserve" ADD CONSTRAINT "tablereserve_table_id_fkey" FOREIGN KEY ("table_id") REFERENCES "table"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tablereserve" ADD CONSTRAINT "tablereserve_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available" ADD CONSTRAINT "available_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "restaurant"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "available" ADD CONSTRAINT "available_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dishmenu" ADD CONSTRAINT "dishmenu_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categorymenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
