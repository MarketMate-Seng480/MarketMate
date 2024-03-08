import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Get all entries in the cart for a specific user
export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  try {
    const carts = await prisma.cart.findMany({
      where: {
        userId: id,
      },
      include: {
        user: true,
        products: {
          include: {
            vendor: true,
          },
        },
      },
    });

    if (carts.length === 0) {
      return NextResponse.json({
        error: "No carts found for the given user ID",
        status: 404,
      });
    }

    return NextResponse.json({ message: "OK", status: 200, data: carts });
  } catch (error) {
    console.error("Error retrieving carts:", error);

    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

// Add a product into the cart for a specific user
export async function POST(req: Request, { params: { id } }: { params: { id: string } }) {
  const { productID, cartID, userID } = await req.json();

  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartID },
      data: {
        products: {
          connect: {
            id: productID,
          },
        },
      },
    });

    return NextResponse.json({ message: "OK", status: 200, data: updatedCart });
  } catch (error) {
    console.error("Error creating cart:", error);

    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}

// Remove a product from the cart for a specific user
export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
  const { productID, cartID, userID } = await req.json();

  try {
    const updatedCart = await prisma.cart.update({
      where: { id: cartID },
      data: {
        products: {
          disconnect: {
            id: productID,
          },
        },
      },
    });

    return NextResponse.json({ message: "OK", status: 200, data: updatedCart });
  } catch (error) {
    console.error("Error deleting product from cart:", error);

    return NextResponse.json({
      error: "Internal Server Error",
      status: 500,
    });
  }
}
