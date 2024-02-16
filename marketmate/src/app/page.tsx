import { Box, Heading, Center } from "@chakra-ui/react";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { sampleMarkets } from "./sampleData/sampleMarkets";
import LocalArtisans from "./components/LocalArtisans";
import { MultiArtistsPreviews } from "@/app/components/MultiArtistPreviews";
import { sampleVendors } from "./sampleData/sampleVendors";
import { PageContainer } from "./components/PageContainer";

export default function Home() {
  return (
    <>
      <PageContainer>
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
            <UpcomingEvents events={sampleMarkets} />
            <LocalArtisans>
              {/* Pass MultiArtistsPreviews as child to LocalArtisans */}
              <MultiArtistsPreviews vendors={sampleVendors} />
            </LocalArtisans>
          </Center>
        </Box>
      </PageContainer>
    </>
  );
}
