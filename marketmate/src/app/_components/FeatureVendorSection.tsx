"use client";
import { Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import VendorCarousel from "@components/VendorCarousel";
import { useRouter } from "next/navigation";
import { CustomButton } from "./CustomButton";

export default function FeatureVendorSection() {
  const router = useRouter();

  return (
    <Flex
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

        <CustomButton
          variant={"secondary"}
          onClick={() => router.push("/shop")}
          mt={8}
        >
          <Text as={"b"}>Discover More Vendors</Text>
        </CustomButton>
      </VStack>
    </Flex>
  );
}
