/*
  Warnings:

  - You are about to drop the column `image` on the `Product` table. All the data in the column will be lost.
  - Added the required column `featureImage` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "images" TEXT[];

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "image",
ADD COLUMN     "detailImage" TEXT[],
ADD COLUMN     "featureImage" TEXT NOT NULL,
ADD COLUMN     "isFeatured" BOOLEAN NOT NULL DEFAULT false;
