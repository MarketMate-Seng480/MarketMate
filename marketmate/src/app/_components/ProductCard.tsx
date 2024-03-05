import { VStack, Image, Heading, Text } from "@chakra-ui/react";

export default function ProductCard() {
  return (
    <VStack spacing={8}>
      <Image
        src="https://via.placeholder.com/150"
        alt="Product Image"
        borderRadius={10}
        w={320}
        h={350}
      />
      <VStack spacing={2}>
        <Heading size={"md"}>Product Name</Heading>
        <Text
          size={"sm"}
          color={"gray.600"}
        >
          Shop
        </Text>
        <Text
          size={"sm"}
          as={"b"}
          color={"gray.500"}
        >
          $100.00
        </Text>
      </VStack>
    </VStack>
  );
}
