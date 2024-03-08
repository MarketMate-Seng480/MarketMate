import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Get a specific product
export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: {
      id,
    },
  });
  if (!product)
    return NextResponse.json({
      error: "Error product not found",
      status: 500,
    });

  return NextResponse.json({ message: "ok", status: 200, data: product });
}