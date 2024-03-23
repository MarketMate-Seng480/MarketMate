import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Create a new cart
export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  // add auth check here to require user to be logged in and have a vendor profile before creating a product
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return NextResponse.json({
      error: "Error finding user",
      status: 500,
    });
  }
  if (user.cartId !== null) {
    return NextResponse.json({
      error: "User already has a cart",
      status: 400,
    });
  }
  
  const cart = await prisma.cart.create({
    data: {
      userId: id,
      total: "0.00",
    },
  });
  if (!cart) {
    return NextResponse.json({
      error: "Error creating cart",
      status: 500,
    });
  }
  
  JSON.stringify(cart);
  const update = await prisma.user.update({
    where: {
      id,
    },
    data: {
      cartId: cart.id,
    },
  });
  if (!update) {
    return NextResponse.json({
      error: "Error updating user",
      status: 500,
    });
  }

  return new NextResponse(JSON.stringify(cart), { status: 201 });
}

// Get cart
export async function GET(request: NextRequest, { params: { id } }: { params: { id: string } }) {
  const products = await prisma.cart.findUnique({
    where: {
      userId: id,
    },
  });
  if (!products) {
    return NextResponse.json({
      error: "Error finding cart",
      status: 500,
    });
  }

  return NextResponse.json({ message: "ok", status: 200, data: products });
}
