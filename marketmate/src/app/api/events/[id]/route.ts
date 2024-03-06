import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Get a specific event
export async function GET(req: Request, { params: { id } }: { params: { id: string } }) {
  const event = await prisma.event.findUnique({
    where: {
      id,
    },
  });
  if (!event)
    return NextResponse.json({
      error: "Error event not found",
      status: 500,
    });

  return NextResponse.json({ message: "ok", status: 200, data: event });
}

// Patch for updating a event
export async function PATCH(req: Request, { params: { id } }: { params: { id: string } }) {
  // TODO: add auth check here

  const json = await req.json();
  const updated = await prisma.event.update({
    where: {
      id,
    },
    data: json,
  });
  return NextResponse.json({ message: "ok", status: 200, data: updated });
}

// Delete a vendor
export async function DELETE(req: Request, { params: { id } }: { params: { id: string } }) {
  // TODO: add auth check here

  const deleted = await prisma.event.delete({
    where: {
      id,
    },
  });
  return NextResponse.json({ message: "ok", status: 200, data: deleted });
}
