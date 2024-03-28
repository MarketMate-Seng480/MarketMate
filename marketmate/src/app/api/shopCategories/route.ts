import { NextResponse, NextRequest } from "next/server";
import prisma from "@prisma/prisma";

// find all products
export async function GET(request: NextRequest) {
    const categories = await prisma.shopCategory.findMany();

    return NextResponse.json({ message: "ok", status: 200, data: categories });
}
