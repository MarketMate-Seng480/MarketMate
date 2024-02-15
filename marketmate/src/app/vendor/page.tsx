import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Admin() {
  return (
    <>
      <Navbar />

      <Box>
        <Center>
          <Heading
            as="h1"
            size="xl"
          >
            Vendor Admin Page
          </Heading>
        </Center>
      </Box>
    </>
  );
}
