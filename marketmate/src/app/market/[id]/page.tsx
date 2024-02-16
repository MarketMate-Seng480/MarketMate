'use client'
import { 
    Box,
    Center,
    Heading, 
    Image, 
    Text, 
    VStack, 
} from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";
import { MultiArtistsPreviews } from "@/app/components/MultiArtistPreviews";
import { PageContainer } from "@/app/components/PageContainer";
import { sampleMarkets } from "@/app/sampleData/sampleMarkets";
import { sampleVendors } from "@/app/sampleData/sampleVendors";

export default function MarketPage() {
    // Temporarily hardcoded, will actually be an API request
    const path = usePathname();
    const slug = path.split("/").pop();
    const market = sampleMarkets.find(market => market.id === Number(slug));
    return (
        <PageContainer>
            <VStack padding={10} spacing={6}>
                <Box maxWidth="800px" margin="auto" padding={4}>
                    {market ? (
                        <>
                            <Image src={market.image} alt="Market Banner" width="100%" borderRadius="lg" />
                            <VStack spacing={4} align="stretch" marginTop={5}>
                            <Heading as="h1" size="xl">
                                {market.name}
                            </Heading>
                            <Text fontSize="lg">
                                <strong>Date:</strong> {market.date}
                            </Text>
                            <Text fontSize="lg">
                                <strong>Location:</strong> {market.location}
                            </Text>
                            <Text fontSize="lg">{market.description}</Text>
                            <Heading as="h2" size="lg">
                                Participating vendors
                            </Heading>
                            <MultiArtistsPreviews vendors={sampleVendors} />
                            </VStack>
                        </>
                    ) : (
                        <Center>Market Not Found</Center>
                    )}
                </Box>
            </VStack>
        </PageContainer>
    );
}