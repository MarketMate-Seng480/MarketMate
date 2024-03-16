import type { Vendor, Product, User, ShopCategory } from "@prisma/client";

export interface Vendor_Extended extends Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  createdAt: Date;
  updatedAt: Date;
  products: Product[];
  user: User;
  shopTags: ShopCategory[];
}
