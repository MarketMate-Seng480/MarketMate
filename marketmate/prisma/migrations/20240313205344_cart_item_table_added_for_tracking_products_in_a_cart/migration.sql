-- CreateTable
CREATE TABLE "Cart_Item" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "cartId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Cart_Item_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "public_Cart_Item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart_Item" ADD CONSTRAINT "public_Cart_Item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
