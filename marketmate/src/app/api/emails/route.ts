import React from "react";
import { NextResponse, NextRequest } from "next/server";
import { Resend } from "resend";
import VendorEmailTemplate from "@/app/_components/VendorConfirmationMail";
import BuyerEmailTemplate from "@/app/_components/BuyerConfirmationEmail";
import { OrderInfo, EmailProps } from "@/app/confirmation/page";

const resend = new Resend(process.env.RESEND_API);

interface ResendRequest {
  from: string;
  to: string;
  subject: string;
  react: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
}

// loop through the productLists to group the products by vendor
function groupProductsByVendor(emailProps: EmailProps): Map<string, OrderInfo[]> {
  const vendorProductMap = new Map<string, OrderInfo[]>();

  emailProps.productLists.forEach((order) => {
    const { vendorID, productName, quantity, vendorName, vendorEmail } = order;

    // Check if the vendor is already in the map
    if (vendorProductMap.has(vendorID)) {
      // If yes, add the product to the existing list
      vendorProductMap
        .get(vendorID)!
        .push({ productName, quantity, vendorName, vendorID, vendorEmail });
    } else {
      // If no, create a new list for the vendor and add the product
      vendorProductMap.set(vendorID, [
        { productName, quantity, vendorName, vendorID, vendorEmail },
      ]);
    }
  });

  return vendorProductMap;
}

export async function POST(request: NextRequest) {
  const { buyerName, buyerEmail, productLists }: EmailProps = await request.json();

  const vendorProductMap = groupProductsByVendor({ buyerName, buyerEmail, productLists });

  // loop through the vendorProducts to send the email to each vendor
  const vendorsBatch: ResendRequest[] = Array.from(vendorProductMap).map(([vendorID, products]) => {
    const { vendorEmail, vendorName } = products[0];

    return {
      from: "Artisway <onboarding@resend.dev>",
      to: vendorEmail,
      subject: buyerName + " is Interested in Your Unique Products! 🎉",
      react: VendorEmailTemplate({
        vendorName,
        buyerName,
        buyerEmail,
        products,
      }) as React.ReactElement,
    };
  });

  const buyerEmailRequest: ResendRequest = {
    from: "Artisway <onboarding@resend.dev>",
    to: buyerEmail,
    subject: "We Have Received Your Request to Order! 🎉",
    react: BuyerEmailTemplate({
      buyerName,
      productLists,
    }) as React.ReactElement,
  };

  try {
    const { data, error } = await resend.batch.send([...vendorsBatch, buyerEmailRequest]);

    if (error) {
      return new NextResponse(JSON.stringify({ error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
