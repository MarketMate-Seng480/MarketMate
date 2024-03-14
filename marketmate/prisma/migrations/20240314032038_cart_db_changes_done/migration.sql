/*
  Warnings:

  - The primary key for the `Cart_Item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_CartToProduct` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartToProduct" DROP CONSTRAINT "_CartToProduct_B_fkey";

-- AlterTable
ALTER TABLE "Cart_Item" DROP CONSTRAINT "Cart_Item_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "_CartToProduct";
