import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { UpcomingEventCard } from "./components/UpcomingEventCard";

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
        <UpcomingEventCard/>
      </Box>
    </>
  );
}
