import { NextResponse } from "next/server";
import prisma from "../../../../prisma/prisma";

// find all products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json({ message: "ok", status: 200, data: products });
}
