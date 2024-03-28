import { NextRequest, NextResponse } from "next/server";
import prisma from "@prisma/prisma";

// Create a new vendor
export async function POST(req: Request) {
    // add auth check here to require user to be logged in before creating a vendor profile
    // additionally, check to make sure a user does not already have a vendor profile

    const { vendor, shopTags, userID } = await req.json();

    try {
        // check if user already has a vendor profile
        const existingVendor = await prisma.vendor.findFirst({
            where: {
                userId: userID,
            },
        });

        if (existingVendor) {
            console.error("User already has a vendor profile");
            return NextResponse.json({
                message: "existed",
                status: 200,
                data: existingVendor,
            });
        }

        // Create a new vendor
        const newVendor = await prisma.vendor.create({
            data: {
                name: vendor.name,
                email: vendor.email,
                phone: vendor.phone,
                bio: vendor.bio,
                description: vendor.description,
                logo: vendor.logo,
                banner: vendor.banner,
                user: {
                    connect: {
                        id: userID,
                    },
                },
            },
        });

        if (!newVendor) {
            console.error("Error creating vendor");
            return NextResponse.json({
                message: "error",
                status: 500,
                error: "Error creating vendor",
            });
        }
        console.log("New vendor created", newVendor);

        // update the user role to vendor
        const updatedUser = await prisma.user.update({
            where: {
                id: userID,
            },
            data: {
                role: "vendor",
                vendorId: newVendor.id,
            },
        });

        if (!updatedUser) {
            console.error("Error updating user role to vendor");
            return NextResponse.json({
                message: "error",
                status: 500,
                error: "Error updating user role to vendor",
            });
        }

        // Connect to shop tags
        if (shopTags) {
            for (const tag of shopTags) {
                await prisma.vendor.update({
                    where: {
                        id: newVendor.id,
                    },
                    data: {
                        shopTags: {
                            connect: {
                                id: tag,
                            },
                        },
                    },
                });
            }
        }

        return NextResponse.json({ message: "ok", status: 200, data: newVendor });
    } catch (error) {
        return NextResponse.json({ message: "error", status: 500, error: error });
    }
}

// Get vendors using paging to control the number to skip and the number of records to take
export async function GET(request: NextRequest) {
    const skip = request.nextUrl.searchParams.get("skip");
    const take = request.nextUrl.searchParams.get("take");
    const total = request.nextUrl.searchParams.get("total");

    if (total) {
        const count = await prisma.vendor.count();
        return NextResponse.json({ data: count });
    } else {
        const data = await prisma.vendor.findMany({
            skip: skip ? parseInt(skip, 10) : undefined,
            take: take ? parseInt(take, 10) : undefined,
            include: {
                shopTags: true,
            },
        });

        return NextResponse.json({ message: "ok", status: 200, data: data });
    }
}
