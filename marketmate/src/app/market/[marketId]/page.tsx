'use client'
import Navbar from "@/app/components/Navbar";
import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";
import { EventCard } from "@/app/components/EventCard";
import { sampleMarkets } from "@/app/sampleMarkets";

export default function MarketPage() {
    // Temporarily hardcoded, will actually be an API request
    const path = usePathname();
    const slug = path.split("/").pop();
    const market = sampleMarkets.find(market => market.marketId === slug);
    return (
        <>
            <Navbar />
            <Box>
            <Center flexDirection='column'>
                <Heading
                as="h1"
                size="xl"
                >
                {market?.title}
                </Heading>
                {market ? (
                    <EventCard 
                        marketId={market.marketId} 
                        image={market.image} 
                        title={market.title} 
                        date={market.date} 
                        location={market.location} 
                        description={market.description}                    
                    />
                ) : "Market Not Found"}
                <Box>List of participating vendors</Box>
            </Center>
            </Box>
      </>
    )
}