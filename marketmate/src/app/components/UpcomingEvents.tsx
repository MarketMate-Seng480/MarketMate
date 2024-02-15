import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { EventCard, EventCardProps } from "./EventCard";

interface UpcomingEventsProps {
    events: EventCardProps[];
}

// TODO: Change layout
export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <SimpleGrid spacing={4} templateColumns='repeat(auto-fill, minmax(400px, 1fr))'>
            {events.map((event) => (
                <EventCard
                    key={event.marketId}
                    marketId={event.marketId}
                    image={event.image}
                    title={event.title}
                    date={event.date}
                    location={event.location}
                    description={event.description}
                />
            ))}
        </SimpleGrid>
    )
}