import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import {
  Box,
  Heading,
  Center,
  Stack,
  Text,
  Flex,
  Image,
  Avatar,
  Button,
  VStack,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import VendorCarousel from "@components/VendorCarousel";
import { PageContainer } from "@components/PageContainer";

function HeroSection() {
  return (
    <Flex
      w="100%"
      h={{
        base: "40vh",
        lg: "50vh",
      }}
      bgGradient="linear(to-r, #CA7A6C, #575F90)"
      color="white"
      alignItems="center"
      justifyContent="center"
    >
      <Heading
        size={{ base: "md", md: "lg" }}
        px={20}
        textAlign={"center"}
      >
        Connecting local art makers to local art buyers
      </Heading>
    </Flex>
  );
}

function FeatureVendorSection() {
  return (
    <Flex
      bg="white"
      px={10}
      w="full"
      alignContent={"center"}
      justifyContent={"center"}
      direction={"column"}
    >
      <VStack spacing={8}>
        <VStack spacing={2}>
          <Heading
            as="h4"
            fontSize={"32"}
          >
            Featured Vendors
          </Heading>
          <Text size={"xs"}>Discover Victoria&apos;s local artisans</Text>
        </VStack>

        <VendorCarousel />

        <Button variant={"outline"}>Discover More Vendors</Button>
      </VStack>
    </Flex>
  );
}

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const user = await supabase.auth.getUser();

  return (
    <PageContainer>
      <Center flexDirection={"column"}>
        <VStack
          spacing={{ base: 8, md: 12 }}
          w="full"
        >
          <HeroSection />

          <FeatureVendorSection />

          <Spacer />
        </VStack>
      </Center>
    </PageContainer>
  );
}
