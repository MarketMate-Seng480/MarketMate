import { Box, Center, Flex } from "@chakra-ui/react";
import SideBar from "./(components)/SideBar";

export default function VendorLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box minH="100vh">
      <SideBar />
      <Box
        ml={{ base: 0, md: 60 }}
        p="4"
      >
        {children}
      </Box>
    </Box>
  );
}
