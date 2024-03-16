"use client";
import React, { useState, useEffect } from "react";
import { Center, Spacer, VStack, Flex, Heading, Text, SimpleGrid } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import Footer from "@components/Footer";
import VendorCard from "@components/VendorCard";
import { Vendor_Extended } from "@lib/types";
import { CustomButton } from "../_components/CustomButton";

async function fetchVendors(skip: number, take: number) {
  const response = await fetch("/api/vendors?take=" + take + "&skip=" + skip);
  const data = await response.json();
  return data.data;
}

export default function AllVendorsPage() {
  const maxPerLoad = 3;
  const [totalNumberOfVendors, setTotalNumberOfVendors] = useState<number>(0);
  const [vendors, setVendors] = useState<Vendor_Extended[]>([]);
  const [vendorCards, setVendorCards] = useState<JSX.Element[]>([]);

  // Fetch 10 vendors from the API on page load
  useEffect(() => {
    const fetchInitialVendors = async () => {
      try {
        const response = await fetchVendors(0, maxPerLoad);
        setVendors(response);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };

    // Fetch the total number of vendors
    async function fetchTotalVendors() {
      try {
        const response = await fetch("/api/vendors?total=true", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setTotalNumberOfVendors(data.data);
      } catch (error) {
        console.error("Error fetching total vendors:", error);
      }
    }

    fetchInitialVendors();
    fetchTotalVendors();
  }, []);

  // When vendors are fetched or updated, create a card for each vendor
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

  // Fetch the next page of vendors
  async function loadMoreVendors() {
    try {
      const response = await fetchVendors(vendors.length, maxPerLoad);
      setVendors([...vendors, ...response]);
    } catch (error) {
      console.error("Error fetching more vendors:", error);
    }
  }

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
              my={{ base: 4, md: 15 }}
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

              {vendors.length < totalNumberOfVendors && (
                <CustomButton
                  onClick={loadMoreVendors}
                  variant="secondary"
                  size="lg"
                  mt={10}
                >
                  Load more vendors
                </CustomButton>
              )}
            </Center>
          </Flex>

          <Spacer />

          <Footer />
        </VStack>
      </Center>
    </PageContainer>
  );
}
