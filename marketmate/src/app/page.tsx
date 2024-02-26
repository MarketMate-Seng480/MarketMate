import { Box, Heading, Center, Stack } from "@chakra-ui/react";

import { UpcomingEvents } from "@components/UpcomingEvents";
import HomepageSection from "@components/LocalArtisans";
import { PageContainer } from "@components/PageContainer";
import { MultiArtistsPreviews } from "@components/MultiArtistPreviews";

import { sampleMarkets } from "./sampleData/sampleMarkets";
import { sampleVendors } from "./sampleData/sampleVendors";

export default async function Home() {
  return (
    <PageContainer>
      <Center flexDirection={"column"}>
        <Box my={75}>
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
            textAlign="center"
          >
            Connect with Victoria&apos;s local artisans
          </Heading>
        </Box>

        <Stack
          direction={"column"}
          spacing={15}
        >
          <HomepageSection title="Upcoming Events">
            <UpcomingEvents events={sampleMarkets} />
          </HomepageSection>
          <HomepageSection title="Local Artisans">
            <MultiArtistsPreviews vendors={sampleVendors} />
          </HomepageSection>
        </Stack>
      </Center>
    </PageContainer>
  );
}
