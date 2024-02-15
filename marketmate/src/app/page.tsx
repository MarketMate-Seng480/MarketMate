import { Box, Heading, Center } from "@chakra-ui/react";
import Navbar from "./components/Navbar";
import { UpcomingEvents } from "./components/UpcomingEvents";

// Hard-coded for now, will need to delete later
export const sampleMarkets = [
  {
    marketId:'marketId1',
    image:'https://images.unsplash.com/photo-1524259493079-d51c2c78adfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Market Title',
    date:'February 28 - March 3, 2024',
    location:'Some Street Address, Victoria',
    description:'This market is a celebration of the upcoming spring season. A variety of vendors have been invited to sell their work, including jewellers, painters, ceramicists, amongst many other artisans!'
  },
  {
    marketId:'marketId2',
    image:'https://images.unsplash.com/photo-1524259493079-d51c2c78adfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Market Title',
    date:'February 28 - March 3, 2024',
    location:'Some Street Address, Victoria',
    description:'This market is a celebration of the upcoming spring season. A variety of vendors have been invited to sell their work, including jewellers, painters, ceramicists, amongst many other artisans!'
  },
  {
    marketId:'marketId3',
    image:'https://images.unsplash.com/photo-1524259493079-d51c2c78adfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title:'Market Title',
    date:'February 28 - March 3, 2024',
    location:'Some Street Address, Victoria',
    description:'This market is a celebration of the upcoming spring season. A variety of vendors have been invited to sell their work, including jewellers, painters, ceramicists, amongst many other artisans!'
  }
]

export default function Home() {
  return (
    <>
      <Navbar />
      <Box>
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
      </Box>
    </>
  );
}
