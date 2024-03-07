import { NextResponse, NextRequest } from "next/server";
import VendorEmailTemplate from "@/app/_components/VendorConfirmationMail";
import { Resend } from "resend";
import React from "react";
import { supabase } from "@/app/lib/supabase";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const resend = new Resend(process.env.RESEND_API);

export async function POST(request: NextRequest) {
  const supabase = createServerComponentClient({ cookies });
  const buyer = await supabase.auth.getUser();
  console.log(buyer);

  if (!buyer) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Artisway <onboarding@resend.dev>", // TODO: change this to the artisway email
      to: [buyer.data.user?.email as string],
      subject: "Hello world",
      react: VendorEmailTemplate({
        vendorName: "Lucas Store",
        buyerName: "Julia",
        buyerEmail: "julhoang11@gmail.com",
        productLists: ["Product 1", "Product 2", "Product 3"],
      }) as React.ReactElement,
    });

    if (error) {
      console.error(error);
      return new NextResponse(JSON.stringify({ error }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    console.log(data);
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
