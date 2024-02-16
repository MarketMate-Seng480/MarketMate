import { Box, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface LocalArtisansProps {
  children: ReactNode;
}

export default function LocalArtisans({ children }: LocalArtisansProps) {
  return (
    <Box p={4} my={4} bg="white" shadow="md" borderWidth="1px" w="full">
      <Heading as="h2" size="md" mb={2}>
        Local artisans
      </Heading>
      {children}
    </Box>
  );
}