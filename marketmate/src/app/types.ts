export interface Vendor {
  id?: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  shopTags: string[];
  address?: string;
  logo?: string;
}

export interface Event {
  id?: number;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  url: string;
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
