import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import LocalArtisans from "../components/LocalArtisans";

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
          <LocalArtisans/>
        </Center>
      </Box>
    </>
  );
}
