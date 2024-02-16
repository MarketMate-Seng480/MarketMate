import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { sampleMarkets } from "./sampleMarkets";

export default function Home() {
  return (
    <>
      <Navbar />
      <Box>
        <Center>
          <Heading
            as="h1"
            size="xl"
          >
            Welcome to MarketMate
          </Heading>
        </Center>
        {/* Just put this on the homepage for now for visibility, will need to be refactored later */}
        <UpcomingEvents events={sampleMarkets}/>
      </Box>
    </>
  );
}
