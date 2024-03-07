import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Create a new vendor
export async function POST(req: Request) {
  // add auth check here to require user to be logged in before creating a vendor profile
  // additionally, check to make sure a user does not already have a vendor profile

  const json = await req.json();
  const created = await prisma.vendor.create({
    data: json,
  });
  if (!created)
    return NextResponse.json({
      error: "Error creating vendor",
      status: 500,
    });

  return NextResponse.json({ message: "ok", status: 201, data: created });
}

// Get vendors using paging to control the number to skip and the number of records to take
export async function GET(request: NextRequest) {
  const skip = request.nextUrl.searchParams.get("skip");
  const take = request.nextUrl.searchParams.get("take");

  const vendors = await prisma.vendor.findMany({
    skip: skip ? parseInt(skip, 10) : undefined,
    take: take ? parseInt(take, 10) : undefined,
  });
  return NextResponse.json({ message: "ok", status: 200, data: vendors });
}
