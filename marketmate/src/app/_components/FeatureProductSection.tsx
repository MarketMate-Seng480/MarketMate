import { Flex, VStack, SimpleGrid, Heading, Text, Button } from "@chakra-ui/react";
import ProductCard from "@components/ProductCard";

export default function FeatureProductSection() {
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
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </SimpleGrid>

        <Button variant={"outline"}>Discover More Products</Button>
      </VStack>
    </Flex>
  );
}
