import prisma from "./prisma";
// import { Vendor, Event } from "@/app/types";
import { Event, Vendor } from "@prisma/client";

const eventSeeds: Event[] = [
  {
    id: 1,
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
    id: 2,
    name: "Vendor1",
    description: "Description for Vendor1",
    email: "vendor1@example.com",
    phone: "1234567890",
    logo: "vendor1.jpg",
    shopTags: ["tag1", "tag2"],
  },
  {
    id: 3,
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
  const createdVendors = await prisma.vendor.upsert({
    where: { id: vendorSeeds[0].id },
    update: vendorSeeds[0],
    create: vendorSeeds[0],
  });

  // Seed events
  const createdEvents = await prisma.event.upsert({
    where: { id: eventSeeds[0].id },
    update: eventSeeds[0],
    create: eventSeeds[0],
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
