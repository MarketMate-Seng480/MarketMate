import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";


export async function GET(request: NextRequest, { params: { id, cartId } }: { params: { id: string, cartId: string } }) {
    const products = await prisma.cart.findUnique({
      where: {
        id: cartId,
      },
      include: {
        Cart_Item: true,
      },
    });
    return NextResponse.json({ message: 'ok', status: 200, data: products })
}

export async function PATCH(req: Request, { params: { id, cartId } }: { params: { id: string, cartId: string } }) {
    const json = await req.json();
    const newItem = await prisma.cart_Item.create({
      data: {
        cartId: cartId,
        productId: json.productId,
        quantity: json.quantity,
        Product: {
          connect: {
            id: json.productId,
          },
        },
      },
    });

    const updated = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        Cart_Item: {
          connect: {
            id: newItem.id,
          },
        },
      },
    });

    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}

export async function DELETE(req: Request, { params: { id, cartId } }: { params: { id: string, cartId: string } }) {
    const json = await req.json();
    const updated = await prisma.cart.update({
      where: {
        id: cartId,
      },
      data: {
        products: {
          disconnect: {
            id: json.productId,
          },
        },
      },
    });

    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}