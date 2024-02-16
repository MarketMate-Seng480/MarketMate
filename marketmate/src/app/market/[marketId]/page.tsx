'use client'
import Navbar from "@/app/components/Navbar";
import { Box, Center, Heading } from "@chakra-ui/react";
import React from "react";
import { usePathname } from "next/navigation";
import { sampleMarkets } from "@/app/page";

export default function MarketPage() {
    // Temporarily hardcoded, will actually be an API request
    const path = usePathname();
    const slug = path.split("/").pop();
    const market = sampleMarkets.find(market => market.marketId === slug);
    return (
        <>
        <Navbar />
        <Box>
          <Center>
            <Heading
              as="h1"
              size="xl"
            >
              {market?.title ?? "Market Not Found"}
            </Heading>
          </Center>
        </Box>
      </>
    )
}