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
        product: true,
      },
    });
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
    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}


// post a new product to the cart
export async function POST(req: Request, { params: { id, cartId, cartItemId } }: { params: { id: string, cartId: string, cartItemId: string } }) {
    const json = await req.json();
    const newItem = await prisma.cart_Item.create({
      data: {
        cartId: cartId,
        productId: json.productId,
        quantity: json.quantity,
      },
    });

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
      },
    });

    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}

// delete a product from the cart
export async function DELETE(req: Request, { params: { id, cartId, cartItemId } }: { params: { id: string, cartId: string, cartItemId: string } }) {
    const json = await req.json();
    const updated = await prisma.cart_Item.delete({
      where: {
        id: cartItemId,
      },
    });

    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}