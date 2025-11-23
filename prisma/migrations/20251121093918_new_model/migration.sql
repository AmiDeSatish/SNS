/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the `PanierItems` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PanierItems" DROP CONSTRAINT "PanierItems_panierId_fkey";

-- DropForeignKey
ALTER TABLE "PanierItems" DROP CONSTRAINT "PanierItems_productId_fkey";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
DROP COLUMN "price";

-- DropTable
DROP TABLE "PanierItems";

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "orderId" INTEGER NOT NULL,
    "productVariantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("orderId","productVariantId")
);

-- CreateTable
CREATE TABLE "PanierItem" (
    "panierId" INTEGER NOT NULL,
    "productVariantId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "PanierItem_pkey" PRIMARY KEY ("panierId","productVariantId")
);

-- CreateTable
CREATE TABLE "Catalogue" (
    "id" SERIAL NOT NULL,
    "productId" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 30,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Catalogue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Catalogue_productId_color_size_key" ON "Catalogue"("productId", "color", "size");

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "Catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanierItem" ADD CONSTRAINT "PanierItem_panierId_fkey" FOREIGN KEY ("panierId") REFERENCES "Panier"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PanierItem" ADD CONSTRAINT "PanierItem_productVariantId_fkey" FOREIGN KEY ("productVariantId") REFERENCES "Catalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Catalogue" ADD CONSTRAINT "Catalogue_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
