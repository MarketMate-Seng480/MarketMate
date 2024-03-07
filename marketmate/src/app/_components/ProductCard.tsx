"use client";
import { VStack, Image, Heading, Text, Box } from "@chakra-ui/react";
import type { Product, Vendor } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function ProductCard({ product }: { product: Product }) {
  const [vendor, setVendor] = useState<Vendor | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        const response = await fetch(`/api/vendors/${product.vendorId}`);
        const data = await response.json();
        setVendor(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchVendor();
  }, [product.vendorId]);

  return (
    <Box>
      <VStack spacing={8}>
        <Image
          src={product.featureImage}
          alt={product.name}
          borderRadius={10}
          w={320}
          h={350}
          onClick={() => router.push("/product/" + product.id)}
          cursor={"pointer"}
        />
        <VStack spacing={2}>
          <Heading
            size={"md"}
            onClick={() => router.push("/product/" + product.id)}
            cursor={"pointer"}
          >
            {product.name}
          </Heading>
          <Text
            size={"sm"}
            color={"gray.600"}
            onClick={() => router.push("/shop/" + product.vendorId)}
            cursor={"pointer"}
            textDecoration={"underline"}
          >
            {vendor?.name || "Vendor Name"}
          </Text>
          <Text
            size={"sm"}
            as={"b"}
            color={"gray.500"}
          >
            {"$" + product.price.toFixed(2)}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
