"use client";
import React, { useState, useEffect } from "react";
import { Center, Spacer, VStack, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import Footer from "@components/Footer";
import VendorCard from "@components/VendorCard";
import type { Vendor } from "@prisma/client";

export default function AllVendorsPage() {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [vendorCards, setVendorCards] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const response = await fetch("/api/vendors");
        const data = await response.json();
        setVendors(data.data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    fetchVendors();
  }, []);

  useEffect(() => {
    if (vendors.length) {
      const cards = vendors.map((vendor) => (
        <VendorCard
          key={vendor.id}
          vendor={vendor}
        />
      ));
      setVendorCards(cards);
    }
  }, [vendors]);

  return (
    <PageContainer>
      <Center flexDirection={"column"}>
        <VStack
          spacing={{ base: 8, md: 16 }}
          w="full"
        >
          <Flex
            w="full"
            alignContent={"center"}
            justifyContent={"center"}
            direction={"column"}
          >
            <VStack
              spacing={8}
              my={{ base: 4, md: 20 }}
              alignItems={"center"}
            >
              <VStack spacing={2}>
                <Heading
                  as="h3"
                  fontSize={{ base: "2xl", md: "4xl" }}
                  color={"text.heading"}
                >
                  All Vendors
                </Heading>
                <Text
                  fontSize={{ base: "sm", md: "lg" }}
                  color={"text.caption"}
                  fontWeight={600}
                >
                  Browse through Victoria&apos;s local artisans
                </Text>
              </VStack>
            </VStack>

            <Center flexDirection={"column"}>
              <SimpleGrid
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={10}
                p={{ base: 4, md: 10 }}
                maxW={"1400px"}
              >
                {vendorCards}
              </SimpleGrid>
            </Center>
          </Flex>

          <Spacer />

          <Footer />
        </VStack>
      </Center>
    </PageContainer>
  );
}
