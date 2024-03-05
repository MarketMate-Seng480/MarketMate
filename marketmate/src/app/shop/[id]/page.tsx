"use client";
import { Box, VStack } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import { usePathname } from "next/navigation";
import { sampleVendors } from "@/app/sampleData/sampleVendors";
import TopBanner from "@/app/vendor/profile/TopBanner";
import InfoSection from "@/app/vendor/profile/InfoSection";
import { Vendor } from "@/app/types";

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
        <InfoSection {...vendor} />
      </Box>
    </>
  );
}

export default function Shop() {
  const path = usePathname();
  const slug = path.split("/").pop();
  const vendor = sampleVendors.find((vendor) => vendor.id === Number(slug));

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
