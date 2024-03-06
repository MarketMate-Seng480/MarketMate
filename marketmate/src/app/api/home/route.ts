import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// find all products
export async function GET() {
  const products = await prisma.product.findMany();
  return NextResponse.json({ message: "ok", status: 200, data: products });
}
