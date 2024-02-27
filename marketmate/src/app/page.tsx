import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Box, Heading, Center, Stack, Text } from "@chakra-ui/react";

import { UpcomingEvents } from "@components/UpcomingEvents";
import HomepageSection from "@components/LocalArtisans";
import { PageContainer } from "@components/PageContainer";
import { MultiArtistsPreviews } from "@components/MultiArtistPreviews";

import { sampleMarkets } from "./sampleData/sampleMarkets";
import { sampleVendors } from "./sampleData/sampleVendors";

<<<<<<< HEAD
export default function Home() {
  async function getVendors() {
    const res = await fetch('/api/vendor')
    const data = await res.json()
    return data.data
  }

=======
export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();
>>>>>>> dev

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

          <Text color={"green"}>User ID: {user?.data.user?.id || "Not logged in"}</Text>

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
