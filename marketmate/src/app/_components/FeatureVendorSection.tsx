"use client";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import VendorCarousel from "@components/VendorCarousel";
import { useRouter } from "next/navigation";

export default function FeatureVendorSection() {
  const router = useRouter();

  return (
    <Flex
      bg="white"
      px={10}
      w="full"
      alignContent={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <VStack spacing={8}>
        <VStack spacing={2}>
          <Heading
            as="h4"
            fontSize={{ base: "2xl", md: "3xl" }}
          >
            Featured Vendors
          </Heading>
          <Text size={"xs"}>Discover Victoria&apos;s local artisans</Text>
        </VStack>

        <VendorCarousel />

        <Button
          variant={"outline"}
          onClick={() => router.push("/shop")}
        >
          Discover More Vendors
        </Button>
      </VStack>
    </Flex>
  );
}
