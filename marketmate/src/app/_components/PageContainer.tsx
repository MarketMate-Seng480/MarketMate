"use client"
import { Box, useTheme } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navigation/Navbar";

interface PageContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  const backgroundColor = useTheme().colors.beige[400];
  return (
    <Box bg={backgroundColor}>
      <Navbar />
      {children}
    </Box>
  );
};

export default PageContainer;
