'use client'
import Navbar from "@/app/components/Navbar";
import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";
import { sampleMarkets } from "@/app/page";
import { EventCard } from "@/app/components/EventCard";

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
                    <EventCard event={market}/>
                ) : "Market Not Found"}
                <Box>List of participating vendors</Box>
            </Center>
            </Box>
      </>
    )
}