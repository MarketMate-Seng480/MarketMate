import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Center, VStack, Spacer } from "@chakra-ui/react";
import PageContainer from "@components/PageContainer";
import FeatureProductSection from "@components/FeatureProductSection";
import FeatureVendorSection from "@components/FeatureVendorSection";
import HeroSection from "@components/HeroSection";
import Footer from "@components/Footer";

export default async function HomePage() {
  // const supabase = createServerComponentClient({ cookies });
  // const user = await supabase.auth.getUser();

  return (
    <PageContainer>
      <Center flexDirection={"column"}>
        <VStack
          spacing={{ base: 8, md: 16 }}
          w="full"
        >
          <HeroSection />

          <FeatureVendorSection />

          <FeatureProductSection />

          <Spacer />

          <Footer />
        </VStack>
      </Center>
    </PageContainer>
  );
}
