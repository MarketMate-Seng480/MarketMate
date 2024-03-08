"use client";
import { Button } from "@chakra-ui/button";
import React from "react";
import type { Cart, Product, Vendor } from "@prisma/client";

export interface OrderInfo {
  productName: string;
  quantity: number;
  vendorName: string;
  vendorID: string;
  vendorEmail: string;
}
export interface EmailProps {
  buyerName: string; // User's first_name + last_name
  buyerEmail: string; // User's email
  productLists: OrderInfo[]; // Array of Products
}

export default function SendVendorEmail() {
  const buyerName = "John Doe";
  const buyerEmail = "jj@tester.com";
  const email1 = "sample@gmail.com";
  const email2 = "sample2@gmail.com";

  const productLists: OrderInfo[] = [
    {
      productName: "Product 1",
      vendorName: "Luca Store",
      quantity: 1,
      vendorEmail: email2,
      vendorID: "1",
    },
    {
      productName: "Product 2",
      vendorName: "Luca Store",
      quantity: 1,
      vendorEmail: email2,
      vendorID: "1",
    },
    {
      productName: "Product 3",
      vendorName: "Julia Store",
      quantity: 1,
      vendorEmail: email2,
      vendorID: "2",
    },
    {
      productName: "Product 4",
      vendorName: "Julia Store",
      quantity: 1,
      vendorEmail: email2,
      vendorID: "2",
    },
  ];

  const orderRequest: EmailProps = {
    buyerName,
    buyerEmail,
    productLists,
  };

  async function handleClick() {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderRequest),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
      } else {
        console.error("Email sending failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return <Button onClick={handleClick}>Send Email</Button>;
}
