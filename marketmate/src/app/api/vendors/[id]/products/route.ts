
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Create a new product
export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  // add auth check here to require user to be logged in and have a vendor profile before creating a product

  const json = await req.json();
  const created = await prisma.product.create({
    data: {
      //...json,
      name: json.name,
      description: json.description,
      price: Number(json.price),
      stock: Number(json.stock),
      featureImage: json.featureImage,
      detailImage: json.detailImage,
      vendorId: id,
    },
  });
  if (!created)
    return NextResponse.json({
      error: "Error creating product",
      status: 500,
    });

  return new NextResponse(JSON.stringify(created), { status: 201 });
}

// Get products using paging to control the number to skip and the number of records to take
export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const skip = request.nextUrl.searchParams.get("skip");
  const take = request.nextUrl.searchParams.get("take");
  const products = await prisma.product.findMany({
    where: {
      vendorId: id,
    },
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
  });
  return NextResponse.json({ message: "ok", status: 200, data: products });
}
