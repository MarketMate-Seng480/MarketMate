import { Box, Heading, Center, Stack } from "@chakra-ui/react";
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
            <Box
              my={75}
              alignContent={"center"}
              justifyContent={"center"}
            >
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
                Connect with Victoria's local artisans
              </Heading>
            </Box>

            <Stack
              direction={"column"}
              spacing={15}
            >
              <Box
                p={4}
                my={15}
                bg="white"
                shadow="md"
                borderWidth="1px"
                w="full"
              >
                <Heading
                  as="h2"
                  size="md"
                  mb={5}
                >
                  Upcoming Events
                </Heading>
                <UpcomingEvents events={sampleMarkets} />
              </Box>

              <LocalArtisans>
                <MultiArtistsPreviews vendors={sampleVendors} />
              </LocalArtisans>
            </Stack>
          </Center>
        </Box>
      </PageContainer>
    </>
  );
}
