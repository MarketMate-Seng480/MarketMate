import { Box, Flex, Spacer } from "@chakra-ui/react";
import PageContainer from "../_components/PageContainer";
import SideBar from "../_components/vendor/SideBar";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <PageContainer>
      <Flex direction="row">
        <Box minWidth="250px">
          <SideBar />
        </Box>
        <Box
          flex="1"
          overflow="hidden"
          padding={8}
        >
          {children}
        </Box>
      </Flex>
    </PageContainer>
  );
}
