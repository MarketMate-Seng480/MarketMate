import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Create a new cart
export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  // add auth check here to require user to be logged in and have a vendor profile before creating a product
  const cart = await prisma.cart.create({
    data: {
      userId: id,
      total: "0.00",
    },
  });
  if (!cart)
    return NextResponse.json({
      error: "Error creating cart",
      status: 500,
    });
  
  JSON.stringify(cart);

  const update = await prisma.user.update({
    where: {
      id,
    },
    data: {
      cartId: cart.id,
    },
  });

  return new NextResponse(JSON.stringify(cart), { status: 201 });
}

// Get cart
export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const products = await prisma.cart.findUnique({
    where: {
      userId: id,
    },
  });
  return NextResponse.json({ message: "ok", status: 200, data: products });
}
