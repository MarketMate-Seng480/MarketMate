"use client";
import React, { useEffect, useState } from "react";
import { Flex, VStack, SimpleGrid, Heading, Text, Button } from "@chakra-ui/react";
import ProductCard from "@components/ProductCard";
import { CustomButton } from "./CustomButton";
import type { Product } from "@prisma/client";
import { useRouter } from "next/navigation";

export default function FeatureProductSection() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log(data);
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const productCards = products?.map((product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ));

  return (
    <Flex
      w="full"
      direction={"column"}
      alignContent={"center"}
      justifyContent={"center"}
    >
      <VStack spacing={6}>
        <VStack spacing={2}>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Featured Products
          </Heading>
          <Text size={"xs"}>Some of our favorite picks and top-sellers</Text>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          p={10}
        >
          {productCards}
        </SimpleGrid>

        <CustomButton
          variant={"secondary"}
          onClick={() => router.push("/product")}
        >
          <Text as={"b"}>Discover More Products</Text>
        </CustomButton>
      </VStack>
    </Flex>
  );
}
