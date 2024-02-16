import { PrismaClient } from "@prisma/client";
import { Vendor, Event } from "../src/app/types";

const prisma = new PrismaClient();

const eventSeeds: Event[] = [
  {
    name: "Event1",
    description: "Description for Event1",
    startDate: new Date("2024-02-08T12:00:00Z"),
    endDate: new Date("2024-02-10T18:00:00Z"),
    location: "Event Location 1",
    url: "https://example.com/event1",
  },
];

const vendorSeeds: Vendor[] = [
  {
    name: "Vendor1",
    description: "Description for Vendor1",
    email: "vendor1@example.com",
    phone: "1234567890",
    logo: "vendor1.jpg",
    shopTags: ["tag1", "tag2"],
  },
  {
    name: "Vendor2",
    description: "vendor 2 description",
    email: "vendor2@example.com",
    phone: "1111111111",
    logo: "vendor2.jpg",
    shopTags: ["tag1"],
  },
];

const seedDatabase = async () => {
  // Seed vendors
  const createdVendors = await prisma.vendor.createMany({
    data: vendorSeeds,
  });

  // Seed events
  const createdEvents = await prisma.event.createMany({
    data: eventSeeds,
  });

  console.log("Seed data has been added to the database.");

  return { createdVendors, createdEvents };
};

// Execute the seedDatabase function
seedDatabase()
  .then((result) => console.log("Seed result:", result))
  .catch((error) => console.error(error))
  .finally(async () => {
    await prisma.$disconnect();
  });
