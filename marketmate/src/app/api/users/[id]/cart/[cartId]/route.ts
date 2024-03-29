import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// get a unique cart
export async function GET(
  req: NextRequest,
  { params: { id, cartId } }: { params: { id: string; cartId: string } }
) {
  const cart = await prisma.cart.findUnique({
    where: {
      id: cartId,
    },
    include: {
      cartItem: {
        include: {
          product: {
            include: {
              vendor: true,
            }
          },
        },
      }
    },
  });
  if (!cart) {
    return NextResponse.json({
      error: "Error finding cart information",
      status: 500,
    });
  }

  return NextResponse.json({ message: "ok", status: 200, data: cart });
}


// Patch for updating a cart
export async function PATCH(
  req: NextRequest,
  { params: { id, cartId } }: { params: { id: string; cartId: string } }
) {
  // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile

  const json = await req.json();
  const updated = await prisma.cart.update({
    where: {
      id: cartId,
    },
    data: json,
  });
  if (!updated) {
    return NextResponse.json({
      error: "Error updating cart information",
      status: 500,
    });
  }

  return NextResponse.json({ message: "ok", status: 200, data: updated });
}


// post a new product to the cart
export async function POST(
  req: Request,
  { params: { id, cartId } }: { params: { id: string; cartId: string } }
) {
  const json = await req.json();

  const product = await prisma.product.findUnique({
    where: {
      id: json.productId,
    },
  });
  if (!product) {
    return NextResponse.json({
      error: "Error finding product information",
      status: 500,
    });
  }

  const item = await prisma.cart_Item.findMany({
    where: {
      cartId: cartId,
      productId: json.productId,
    },
  });
  if (item[0]) {
    const updated = await prisma.cart_Item.update({
      where: {
        id: item[0].id,
      },
      data: {
        quantity: item[0].quantity + json.quantity,
      },
    });
    if (!updated) {
      return NextResponse.json({
        error: "Error updating cartItem information",
        status: 500,
      });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });
    if (!cart) {
      return NextResponse.json({
        error: "Error finding cart information",
        status: 500,
      });
    }

    const updatedCart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total: JSON.stringify(Number(cart.total) + json.quantity * product.price),
      },
    });
    if (!updatedCart) {
      return NextResponse.json({
        error: "Error updating cart information",
        status: 500,
      });
    }
    return NextResponse.json({ message: "ok", status: 200, data: updated });

  } else {
    const newItem = await prisma.cart_Item.create({
      data: {
        cartId: cartId,
        productId: json.productId,
        quantity: json.quantity,
      },
    });
    if (!newItem) {
      return NextResponse.json({
        error: "Error creating new cartItem",
        status: 500,
      });
    }

    const cart = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
    });
    if (!cart) {
      return NextResponse.json({
        error: "Error finding cart information",
        status: 500,
      });
    }

    const updated = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        cartItem: {
          connect: {
            id: newItem.id,
          },
        },
        total: JSON.stringify(Number(cart.total) + newItem.quantity * product.price),
      },
    });
    if (!updated) {
      return NextResponse.json({
        error: "Error updating cart information",
        status: 500,
      });
    }

    return NextResponse.json({ message: "ok", status: 200, data: newItem });
  }
}

// delete all items in the cart
export async function DELETE(
  req: Request,
  { params: { id, cartId } }: { params: { id: string; cartId: string } }
) {
  
  // Delete all cartItems linked to the cart
  const deletedItems = await prisma.cart_Item.deleteMany({
    where: {
      cartId: cartId,
    },
  });
  
  return NextResponse.json({ message: "ok", status: 200, data: deletedItems });
}
