import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import LocalArtisans from "./components/LocalArtisans";

export default function Home() {
  return (
    <>
      <Navbar />
    
      <Box>
        <Center flexDirection={"column"}>
          <Heading
            as="h1"
            size="xl"
          >
            Welcome to MarketMate
          </Heading>
          <Heading
            as="h1"
            size="md"
            color="grey"
          >
            Slogan here:
          </Heading>
          <LocalArtisans/>
          
        </Center>
      </Box>
    </>
  );
}
