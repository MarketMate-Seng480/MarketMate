import React from "react";
import { OrderInfo } from "../confirmation/page";

export interface VendorEmailProps {
  vendorName: string;
  buyerName: string;
  buyerEmail: string;
  products: OrderInfo[];
}

const VendorEmailTemplate: React.FC<VendorEmailProps> = ({
  vendorName,
  buyerName,
  buyerEmail,
  products,
}) => {
  return (
    <div>
      Hello {vendorName}!
      <br />
      <br />
      Exciting news! {buyerName} is interested in your product{products.length > 1 ? "s" : ""}:
      <ul>
        {products.map((product, index) => (
          <li key={index}>
            {product.productName} - Quantity: {product.quantity}
          </li>
        ))}
      </ul>
      Next Steps: {buyerName} can&apos;t wait to hear from you. Contact them at {buyerEmail} to
      arrange <b>order pickups</b> and <b>payments</b>.
      <br />
      <br />
      Best,
      <br />
      The Artisway Team
    </div>
  );
};

export default VendorEmailTemplate;
