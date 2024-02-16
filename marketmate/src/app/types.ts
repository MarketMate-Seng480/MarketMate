export interface Vendor {
  id?: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  logo: string;
  shopTags: string[];
  address?: string;
  images: string[];
}

export interface Event {
  id?: number;
  name: string;
  description: string;
  date: string;
  location: string;
  image: string
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  vendor: Vendor; // Assuming you want to include the full vendor information in the product
  vendorId: number;
}

