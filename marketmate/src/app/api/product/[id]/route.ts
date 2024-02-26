import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}) {
    const id = params.id
    const product = await prisma.product.findMany({
        where: {
            //id: parseInt(id)
            id: {in: id}
        }
    })
    if (!product) return NextResponse.json({ 
        error: "Error product not found",
        status: 500 
    })
        
    return NextResponse.json({ message: 'ok', status: 200, data: product })
}