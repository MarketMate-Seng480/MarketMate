import { HStack } from "@chakra-ui/react";
import React from "react";
import { EventCard, EventCardProps } from "./EventCard";

interface UpcomingEventsProps {
    events: EventCardProps[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <HStack spacing={5}>
            {events.map((event, index) => (
                <EventCard
                    key={event.marketId || index} 
                    marketId={event.marketId} 
                    image={event.image} 
                    title={event.title} 
                    date={event.date} 
                    location={event.location} 
                    description={event.description}                    
                />
            ))}
        </HStack>
    );
}