'use client'
import { Box, Heading, Center, VStack } from "@chakra-ui/react";
import { PageContainer } from "../../components/PageContainer";
import { usePathname } from "next/navigation";
import { sampleVendors } from "@/app/sampleData/sampleVendors";

export default function Shop() {
  const path = usePathname();
  const slug = path.split("/").pop();
  const vendor = sampleVendors.find(vendor => vendor.id === Number(slug));
  return (
    <PageContainer>
      <VStack padding={10} spacing={6}>
      {vendor ? (
        <Box>
        <Center>
          <Heading
            as="h1"
            size="xl"
          >
            {vendor.name}
          </Heading>
        </Center>
      </Box>
      ) : (
        <Box>Vendor Not Found</Box>
      )}
      </VStack>
    </PageContainer>
  );
}