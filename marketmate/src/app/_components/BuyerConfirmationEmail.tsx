import React from "react";
import { OrderInfo } from "./CartTable";

export interface BuyerEmailProps {
  buyerName: string;
  productLists: OrderInfo[];
}

const BuyerEmailTemplate: React.FC<BuyerEmailProps> = ({ buyerName, productLists }) => {
  return (
    <div>
      Hello {buyerName}!
      <br />
      <br />
      We have received your request to order the following products:
      <ul>
        {productLists.map((product, index) => (
          <li key={index}>
            {product.productName} - Quantity: {product.quantity} - Vendor: {product.vendorName}
          </li>
        ))}
      </ul>
      Your vendors will be in touch with you soon to arrange <b>order pickups</b> and{" "}
      <b>payments</b>. Please keep an eye on your email for further communication.
      <br />
      <br />
      Have a great day,
      <br />
      The Artisway Team
    </div>
  );
};

export default BuyerEmailTemplate;
