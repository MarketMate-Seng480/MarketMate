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
        data: {
            name: json.name,
            description: json.description,
            price: Number(json.price),
            stock: Number(json.stock),
            featureImage: json.featureImage,
            detailImage: json.detailImage,
        }
    })
    return NextResponse.json({ message: 'ok', status: 200, data: updated })
}



// Delete a product
export async function DELETE(req: Request, { params: {id, productId} }: { params: { id: string, productId: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor that owns the product before deleting a product

    // find the product to be deleted
    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            vendorId: id
        },
        include: {
            Cart_Item: {
                include: {
                    cart: {
                        include: {
                            user: true
                        }
                    }
                }
            }
        },
    })
    if (!product) return NextResponse.json({ 
        error: "Error product not found",
        status: 404 
    })

    // delete all cart items that have the product
    for (const cartItem of product.Cart_Item) {
        const res = await prisma.cart_Item.delete({
            where: {
                id: cartItem.id
            }
        })
        if (!res) return NextResponse.json({ 
            error: "Error deleting cart item",
            status: 500 
        })

        // update the cart associated with the cartItem
        const updated = await prisma.cart.update({
            where: {
                id: cartItem.cartId
            },
            data: {
                total: JSON.stringify(Number(cartItem.cart.total) - cartItem.quantity * product.price)
            }
        })
        if (!updated) return NextResponse.json({ 
            error: "Error updating cart",
            status: 500 
        })
    }

    // delete the product
    const deleted = await prisma.product.delete({
        where: {
            id: productId,
            vendorId: id
        }
    })
    if (!deleted) return NextResponse.json({ 
        error: "Error deleting product",
        status: 500 
    })


    return NextResponse.json({ message: 'ok', status: 200, data: deleted })
}