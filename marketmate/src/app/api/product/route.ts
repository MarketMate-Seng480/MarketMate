import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new product
export async function POST(req: NextRequest) {
    const res = await req.json()
    const productData = JSON.parse(res.body)
    const newProduct = await prisma.product.create({
        data: productData
    })

    return NextResponse.json(newProduct)

}

// Get all products
export async function GET() {
    const products = await prisma.product.findMany()
    return NextResponse.json(products)
}