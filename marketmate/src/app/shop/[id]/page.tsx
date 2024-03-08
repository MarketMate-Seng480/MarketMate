"use client";
import { useState, useEffect } from "react";
import { Box, VStack } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import TopBanner from "@components/vendor/TopBanner";
import InfoSection from "@components/vendor/InfoSection";
import type { Vendor } from "@prisma/client";
import LoadingPage from "@components/Loading";

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

  useEffect(() => {
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
  }, [fetchURL]);

  return (
    <PageContainer>
      <VStack
        padding={10}
        spacing={6}
      >
        {vendor ? <ProfilePage {...vendor} /> : <LoadingPage />}
      </VStack>
    </PageContainer>
  );
}
