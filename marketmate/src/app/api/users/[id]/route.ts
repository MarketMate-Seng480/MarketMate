import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Get a specific user
export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user)
    return NextResponse.json({
      error: "Error user not found",
      status: 500,
    });

  return NextResponse.json({ message: "ok", status: 200, data: user });
}

// Patch for updating a user
export async function PATCH(req: Request, { params: { id } }: { params: { id: string } }) {
  // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile

  const json = await req.json();
  const updated = await prisma.user.update({
    where: {
      id,
    },
    data: json,
  });
  return NextResponse.json({ message: "ok", status: 200, data: updated });
}

// Delete a user
export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
  // TODO: add auth check here to require user to be logged in and be the vendor before updating a vendor profile

  const deleted = await prisma.user.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "ok", status: 200, data: deleted });
}
