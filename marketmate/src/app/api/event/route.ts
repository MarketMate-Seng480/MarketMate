import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Create a new event
export async function POST(req: NextRequest) {
    const res = await req.json()
    const eventData = JSON.parse(res.body)
    const newEvent = await prisma.event.create({
        data: eventData
    })

    return NextResponse.json(newEvent)

}

// Get all events
export async function GET() {
    const events = await prisma.event.findMany()
    return NextResponse.json(events)
}