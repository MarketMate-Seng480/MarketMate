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

// Patch for updating a cart
export async function PATCH(req: Request, { params: { id } }: { params: { id: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile
  
    const json = await req.json();
    const updated = await prisma.cart.update({
      where: {
        id,
      },
      data: json,
    });
    return NextResponse.json({ message: "ok", status: 200, data: updated });
}

// Delete a cart
export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile
  
    const deleted = await prisma.cart.delete({
      where: {
        id,
      },
    });
    return NextResponse.json({ message: "ok", status: 200, data: deleted });
  }
