'use client';
import {
  Stack,
  Heading,
  Text,
  InputGroup,
  Input,
  InputLeftAddon,
  Badge,
  Spacer,
  SimpleGrid,
  Box,
  VStack,
} from "@chakra-ui/react";
import { Vendor, Product } from "@prisma/client";
import ProductCard from "@components/ProductCard";
import { useState, useEffect } from "react";

const InfoComponent = (title: string, value: string) => {
  return (
    <InputGroup alignContent={"center"}>
      <InputLeftAddon w={175}>{title}</InputLeftAddon>
      <Input
        isReadOnly
        value={value}
      />
    </InputGroup>
  );
};

export default function InfoSection(vendor: Vendor) {
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/vendors/${vendor.id}/products`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        const products = await data.data;
        setProducts(products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [vendor.id]);


  const productCards = products.map((product: Product) => (
    <ProductCard
      key={product.id}
      product={product}
    />
  ));

  return (
    <Stack
      direction={"column"}
      mt={10}
      spacing={8}
    >
      {/* About Us */}
      <Stack spacing={4}>
        <Heading size="md">About Us</Heading>
        <Text>{vendor.description}</Text>
      </Stack>

      {/* Store Tags */}
      <Stack spacing={4}>
        <Heading size="md">Store Tags</Heading>
        
      </Stack>

      {/* Store Info */}
      <Stack spacing={4}>
        <Heading size="md">Store Info</Heading>
        <Stack spacing={2}>
          {InfoComponent("Phone Number", vendor.phone)}
          {InfoComponent("Email Address", vendor.email)}
        </Stack>
      </Stack>

      {/* Featured Products */}
      <VStack spacing={6}>
        <VStack spacing={2}>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Featured Products
          </Heading> 
        </VStack>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={10}
          p={10}
        >
          {productCards}
        </SimpleGrid>
      </VStack>

      <Spacer />
    </Stack>
  );
}
