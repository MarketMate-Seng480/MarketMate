import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Get a specific product
export async function GET(req: Request, { params: {id, productId} }: { params: { id: string, productId: string } }) {
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            vendorId: id
        }
    })
    if (!product) return NextResponse.json({ 
        error: "Error product not found",
        status: 500 
    })
        
    return NextResponse.json({ message: 'ok', status: 200, data: product })
}


// Patch for updating a product
export async function PATCH(req: Request, { params: {id, productId} }: { params: { id: string, productId: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor that owns the product before updating a product

    const json = await req.json()
    const updated = await prisma.product.update({
        where: {
            id: productId,
            vendorId: id
        },
        data: json
    })
    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}



// Delete a product
export async function DELETE(req: Request, { params: {id, productId} }: { params: { id: string, productId: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor that owns the product before deleting a product

    const deleted = await prisma.product.delete({
        where: {
            id: productId,
            vendorId: id
        }
    })
    return NextResponse.json({ message: 'ok', status: 200, data: deleted })
}