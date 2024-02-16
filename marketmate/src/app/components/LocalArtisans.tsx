import { Box, Heading } from "@chakra-ui/react";
import React, { ReactNode } from "react";

interface LocalArtisansProps {
  children: ReactNode;
  title: string;
}

export default function HomepageSection({ children, title }: LocalArtisansProps) {
  return (
    <Box
      p={4}
      my={5}
      bg="white"
      borderWidth="1px"
      borderRadius={4}
      w="full"
    >
      <Heading
        as="h2"
        size="md"
        mb={5}
      >
        {title}
      </Heading>
      {children}
    </Box>
  );
}
