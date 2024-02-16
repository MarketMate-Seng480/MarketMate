import {Box, Heading } from "@chakra-ui/react";
import React from "react";



export default function LocalArtisans() {
  return (
    <Box p={4} my={4} bg="white" shadow="md" borderWidth="1px" w="full">
      <Heading as="h2" size="md" mb={2}>
        Local artisans
      </Heading>
      {/* Artist previews component */}
    </Box>
  );
  };