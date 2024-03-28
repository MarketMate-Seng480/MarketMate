import { NextResponse, NextRequest } from "next/server";
import prisma from "@prisma/prisma";

// find all products
export async function GET(request: NextRequest) {
    const skip = request.nextUrl.searchParams.get("skip");
    const take = request.nextUrl.searchParams.get("take");
    const products = await prisma.product.findMany({
        skip: skip ? parseInt(skip, 10) : undefined,
        take: take ? parseInt(take, 10) : undefined,
    });
    return NextResponse.json({ message: "ok", status: 200, data: products });
}
