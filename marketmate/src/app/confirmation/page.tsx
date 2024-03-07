"use client";
import { Button } from "@chakra-ui/button";
import React from "react";
import type { Cart } from "@prisma/client";

export default function SendVendorEmail() {
  async function handleClick() {
    try {
      const response = await fetch("/api/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
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
