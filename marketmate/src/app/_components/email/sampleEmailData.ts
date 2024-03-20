// temp fix for the missing type
export interface SampleOrderInfo {
  buyerName: string;
  buyerEmail: string;
  productName: string;
  quantity: number;
  price: number;
  vendorName: string;
  vendorID: string;
  image: string;
}

export const orderList: SampleOrderInfo[] = [
  {
    buyerName: "Julia H",
    buyerEmail: "j@example.com",
    productName: "Clay Mug - Tint Blue",
    quantity: 1,
    price: 15,
    vendorName: "Vendor Name 1",
    vendorID: "vendor1",
    image:
      "https://images.unsplash.com/photo-1495100497150-fe209c585f50?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    buyerName: "Julia H",
    buyerEmail: "j@example.com",
    productName: "Black Tote Bag",
    quantity: 2,
    price: 50,
    vendorName: "Vendor Name 2",
    vendorID: "vendor2",
    image:
      "https://images.unsplash.com/photo-1578237493287-8d4d2b03591a?q=80&w=2726&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    buyerName: "Julia H",
    buyerEmail: "j@example.com",
    productName: "Handmade Soap",
    quantity: 1,
    price: 15,
    vendorName: "Vendor Name 2",
    vendorID: "vendor2",
    image:
      "https://images.unsplash.com/photo-1607006344380-b6775a0824a7?q=80&w=2682&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// Group products by vendor
export const productsByVendor = orderList.reduce(
  (acc: Record<string, SampleOrderInfo[]>, product: SampleOrderInfo) => {
    if (!acc[product.vendorID]) {
      acc[product.vendorID] = [];
    }
    acc[product.vendorID].push(product);
    return acc;
  },
  {}
);
