"use client";
import { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import CartItem from "@components/BasketProduct";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import TopBanner from "@/app/vendor/[id]/profile/TopBanner";
import InfoSection from "@/app/vendor/[id]/profile/InfoSection";
import type { Vendor } from "@prisma/client";

function ProfilePage(vendor: Vendor) {
  return (
    <>
      <TopBanner
        name={vendor.name}
        logo={vendor.logo || ""}
      />
      <Box
        mx={10}
        mt={10}
      >
        {/* <InfoSection {...vendor} /> */}
        <text>{vendor.description}</text>
      </Box>
    </>
  );
}

export default function Shop() {
  const path = usePathname();
  const slug = path.split("/").pop();
  const fetchURL = `/api/vendors/${slug}`;
  const [vendor, setVendor] = useState<Vendor | null>(null);

  const fetchVendor = async () => {
    try {
      const response = await fetch(fetchURL);
      const data = await response.json();
      console.log("data", data);
      setVendor(data.data);
    } catch (error) {
      console.error("Error fetching vendor:", error);
    }
  };

  fetchVendor();

  return (
    <PageContainer>
      <VStack
        padding={10}
        spacing={6}
      >
        {vendor ? <ProfilePage {...vendor} /> : <Box>Vendor Not Found</Box>}
      </VStack>
    </PageContainer>
  );
}
