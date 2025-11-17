/*
  Warnings:

  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sexe" AS ENUM ('male', 'female', 'unisex');

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "sexe" "Sexe" NOT NULL DEFAULT 'unisex';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
