import { HStack } from "@chakra-ui/react";
import React from "react";
import { EventCard, EventCardProps } from "./EventCard";

interface UpcomingEventsProps {
    events: EventCardProps['event'][];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <HStack spacing={5}>
            {events.map((event, index) => (
                <EventCard
                    key={event.marketId || index}
                    event={event}
                />
            ))}
        </HStack>
    );
}