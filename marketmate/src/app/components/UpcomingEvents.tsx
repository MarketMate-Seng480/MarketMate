import { HStack } from "@chakra-ui/react";
import React from "react";
import { EventCard } from "./EventCard";
import { Event } from "../types"

interface UpcomingEventsProps {
    events: Event[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
    return (
        <HStack spacing={5}>
            {events.map((event, index) => (
                <EventCard
                    key={event.id || index} 
                    id={event.id} 
                    image={event.image} 
                    name={event.name} 
                    date={event.date} 
                    location={event.location} 
                    description={event.description}                    
                />
            ))}
        </HStack>
    );
}