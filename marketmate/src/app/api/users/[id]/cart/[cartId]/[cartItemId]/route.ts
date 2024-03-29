import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";


// get a product from a cart
export async function GET(req: Request, { params: { id, cartId, cartItemId } }: { params: { id: string, cartId: string, cartItemId: string } }) {
    const products = await prisma.cart_Item.findUnique({
      where: {
        id: cartItemId,
      },
      include: {
        product: {
          include: {
            vendor: true,
          }
        },
      },
    });
    if (!products) {
      return NextResponse.json({
        error: "Error finding product information",
        status: 500,
      });
    }
    return NextResponse.json({ message: 'ok', status: 200, data: products })
}


// update a product in a cart
export async function PATCH(req: Request, { params: { id, cartId, cartItemId } }: { params: { id: string, cartId: string, cartItemId: string } }) {
    const json = await req.json();
    const updated = await prisma.cart_Item.update({
      where: {
        id: cartItemId,
      },
      data: json,
    });
    if(!updated) {
      return NextResponse.json({
        error: "Error updating cartItem information",
        status: 500,
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: updated.productId,
      },
    });
    if(!product) {
      return NextResponse.json({
        error: "Error getting product information",
        status: 500,
      });
    }

    const updatedCart = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        total: JSON.stringify(updated.quantity * product.price),
      },
    });
    if(!updatedCart) {
      return NextResponse.json({
        error: "Error updating cart information",
        status: 500,
      });
    }
    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}


// delete a product from the cart
export async function DELETE(req: Request, { params: { id, cartId, cartItemId } }: { params: { id: string, cartId: string, cartItemId: string } }) {
    const deleted = await prisma.cart_Item.delete({
      where: {
        id: cartItemId,
      },
    });
    if (!deleted) {
      return NextResponse.json({
        error: "Error deleting cartItem",
        status: 500,
      });
    }

    const product = await prisma.product.findUnique({
      where: {
        id: deleted.productId,
      },
    });
    if (!product) {
      return NextResponse.json({
        error: "Error finding product information",
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
        total: JSON.stringify(Number(cart.total) - deleted.quantity * product.price),
      },
    });
    if (!updatedCart) {
      return NextResponse.json({
        error: "Error updating cart information",
        status: 500,
      });
    }


    return NextResponse.json({ message: 'ok', status: 200, data: deleted })
}