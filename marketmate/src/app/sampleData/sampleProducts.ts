import { Product } from "../types";
import { sampleVendors } from "./sampleVendors";

const initialVendorInfo = sampleVendors[0];

export const sampleProducts: Product[] = [
  {
    name: "Handmade Envelope",
    description: "A perfect envelope for a special someone!",
    price: 5,
    image:
      "https://images.unsplash.com/photo-1566125882500-87e10f726cdc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendor: initialVendorInfo,
    vendorId: 0,
  },
  {
    name: "Crochet Coasters",
    description: "Make your home cozy with these hand crafted crochet coasters.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1627667539472-75fbc7f4654d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendor: initialVendorInfo,
    vendorId: 0,
  },
  {
    name: "Handmade Soap",
    description: "We use fresh herbs and all-natural ingredients to make these bars of soap.",
    price: 16,
    image:
      "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    vendor: initialVendorInfo,
    vendorId: 0,
  },
];
