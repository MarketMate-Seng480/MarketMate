import TopBanner from "./TopBanner";
import { Box, VStack } from "@chakra-ui/react";
import type { Vendor } from "@prisma/client";
import { CustomHeading } from "../CustomHeading";

export default function PublicStoreFrontPage(vendor: Vendor) {
  return (
    <VStack
      w={"full"}
      alignContent={"center"}
    >
      <TopBanner
        shopName={vendor.name}
        logo={vendor.logo}
        banner={vendor.banner}
      />
      <Box
        mx={10}
        mt={10}
      >
        <CustomHeading size="lg">{vendor.name}</CustomHeading>

        {
          // vendor.
        }
      </Box>
    </VStack>
  );
}
