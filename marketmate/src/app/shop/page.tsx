import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";

export default function Shop() {
  return (
    <>
      <Navbar />

      <Box>
        <Center>
          <Heading
            as="h1"
            size="xl"
          >
            A Vendors shop
          </Heading>
        </Center>
      </Box>
    </>
  );
}