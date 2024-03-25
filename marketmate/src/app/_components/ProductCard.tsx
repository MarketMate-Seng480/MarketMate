"use client";
import { VStack, Image, Heading, Text, Box } from "@chakra-ui/react";
import type { Product, Vendor } from "@prisma/client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { NavLink } from "./navigation/CustomLinks";

function capitalizeWords(inputString: string) {
  let words = inputString.split(" ");
  let capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  return capitalizedWords.join(" ");
}

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
          objectFit={"cover"}
          fallback={
            <Box
              w={320}
              h={350}
              bg={"gray.500"}
              borderRadius={10}
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
              onClick={() => router.push("/product/" + product.id)}
              cursor={"pointer"}
            >
              <Text color={"black"}>{product.name} Image</Text>
            </Box>
          }
        />
        <VStack spacing={2}>
          <Heading
            size={"md"}
            onClick={() => router.push("/product/" + product.id)}
            cursor={"pointer"}
          >
            {capitalizeWords(product.name) || "Product Name"}
          </Heading>
          <NavLink href={"/shop/" + product.vendorId}>
            {capitalizeWords(vendor?.name || "Vendor Name")}
          </NavLink>

          <Text
            size={"sm"}
            as={"b"}
            color={"gray.100"}
          >
            {"$" + product.price.toFixed(2)}
          </Text>
        </VStack>
      </VStack>
    </Box>
  );
}
