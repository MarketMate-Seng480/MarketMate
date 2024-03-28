import type { Vendor, Product, User, ShopCategory } from "@prisma/client";

/// Vendor_Extended is a type that encapsulates all Vendor data and linked data
export interface Vendor_Extended extends Vendor {
    id: string;
    name: string;
    bio: string;
    description: string;
    logo: string;
    products: Product[];
    user: User;
    shopTags: ShopCategory[];
}
