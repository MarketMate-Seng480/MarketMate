/*
  Warnings:

  - You are about to drop the column `cartID` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "cartID",
ADD COLUMN     "cartId" TEXT;
