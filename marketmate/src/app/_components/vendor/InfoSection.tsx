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
import { useState, useEffect } from "react";
import { UpcomingEvents } from "@components/UpcomingEvents";
import ProductCard from "@components/ProductCard";
import { useRouter } from "next/navigation";

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
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/vendor/${vendor.id}/products`, {
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
  }, [vendor.id]);

  const productCards = products?.map((product) => (
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

      {/* Upcoming Market Events */}
      <Stack spacing={4}>
        <Heading size="md">Upcoming Market Events</Heading>
        
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
          <Text size={"xs"}>Some of our favorite picks and top-sellers</Text>
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
