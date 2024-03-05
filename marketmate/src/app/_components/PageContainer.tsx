import { Box, VStack } from "@chakra-ui/react";
import React from "react";
// import Navbar from "./Navbar";
import Navbar from "./UpdatedNav";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <Box bg={"FDFAF8"}>
      {/* <Navbar isVendorPage={false} /> */}
      <Navbar />
      {children}
    </Box>
  );
};

export default PageContainer;
