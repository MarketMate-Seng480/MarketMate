import { Box, Heading, Center, VStack } from "@chakra-ui/react";
import { UpcomingEvents } from "./components/UpcomingEvents";
import { sampleMarkets } from "./sampleMarkets";
import { PageContainer } from "./components/PageContainer";

export default function Home() {
  return (
      <PageContainer>
        <VStack padding={10} spacing={6}>
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
        </VStack>
      </PageContainer>
  );
}
