import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { sampleMarkets } from "./sampleMarkets";
import LocalArtisans from "./components/LocalArtisans";
import { MultiArtistsPreviews } from "@/app/components/MultiArtistPreviews";
import ArtistPreview from "./components/ArtistPreview";
import { sampleVendors } from "/workspace/marketmate/src/app/sampleVendors";
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
          <UpcomingEvents events={sampleMarkets}/>
          <LocalArtisans/>
          <MultiArtistsPreviews vendors={sampleVendors} />
                  
        </Center>
        {/* Just put this on the homepage for now for visibility, will need to be refactored later */}
       {/* <UpcomingEvents events={sampleMarkets}/> */}
      </Box>
    </>
  );
}
