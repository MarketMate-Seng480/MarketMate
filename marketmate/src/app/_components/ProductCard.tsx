"use client";
import { VStack, Image, Heading, Text } from "@chakra-ui/react";
import type { Vendor } from "@prisma/client";
import { useEffect, useState } from "react";

interface ProductCardProps {
  name: string;
  vendorId: string;
  price: number;
  featureImage: string;
}

export default function ProductCard({ name, vendorId, price, featureImage }: ProductCardProps) {
  const [vendor, setVendor] = useState<Vendor | null>(null);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendors/${vendorId}`);
        const data = await response.json();
        setVendor(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchVendor();
  }, [vendorId]);

  return (
    <VStack spacing={8}>
      <Image
        src={featureImage}
        alt={name}
        borderRadius={10}
        w={320}
        h={350}
      />
      <VStack spacing={2}>
        <Heading size={"md"}>{name}</Heading>
        <Text
          size={"sm"}
          color={"gray.600"}
        >
          {vendor?.name || "Vendor Name"}
        </Text>
        <Text
          size={"sm"}
          as={"b"}
          color={"gray.500"}
        >
          {"$" + price}
        </Text>
      </VStack>
    </VStack>
  );
}
