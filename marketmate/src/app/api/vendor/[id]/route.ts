import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}) {
    const id = params.id
    const vendor = await prisma.vendor.findMany({
        where: {
            //id: parseInt(id)
            id: {in: id}
        }
    })
    if (!vendor) return NextResponse.json({ 
        error: "Error vendor not found",
        status: 500 
    })
        
    return NextResponse.json({ message: 'ok', status: 200, data: vendor })
}