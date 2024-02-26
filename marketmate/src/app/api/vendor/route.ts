import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new vendor
export async function POST(req: NextRequest) {
    const res = await req.json()
    const vendorData = JSON.parse(res.body)
    const newVendor = await prisma.vendor.create({
        data: vendorData
    })
    if (!newVendor) return NextResponse.json({ 
        error: "Error creating vendor",
        status: 500 
    })
        
    return NextResponse.json({ message: 'ok', status: 200, data: newVendor })

}

// Get vendors
export async function GET() {
    const vendors = await prisma.vendor.findMany()
    return NextResponse.json({ message: 'ok', status: 200, data: vendors })  
}