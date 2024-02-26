import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, {params}) {
    const id = params.id
    const event = await prisma.event.findMany({
        where: {
            //id: parseInt(id)
            id: {in: id}
        }
    })
    if (!event) return NextResponse.json({ 
        error: "Error event not found",
        status: 500 
    })
        
    return NextResponse.json({ message: 'ok', status: 200, data: event })
}