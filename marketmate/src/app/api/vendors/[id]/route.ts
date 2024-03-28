import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Get a specific vendor
export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
    const vendor = await prisma.vendor.findUnique({
        where: {
            id,
        },
        include: {
            products: true,
            shopTags: true,
        },
    });
    if (!vendor)
        return NextResponse.json({
            error: "Error vendor not found",
            status: 500,
        });

    return NextResponse.json({ message: "ok", status: 200, data: vendor });
}

// Patch for updating a vendor
export async function PATCH(req: Request, { params: { id } }: { params: { id: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile

    const json = await req.json();
    const updated = await prisma.vendor.update({
        where: {
            id,
        },
        data: json,
    });
    return NextResponse.json({ message: "ok", status: 200, data: updated });
}

// Delete a vendor
export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
    // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile

    const deleted = await prisma.vendor.delete({
        where: {
            id,
        },
    });
    return NextResponse.json({ message: "ok", status: 200, data: deleted });
}
