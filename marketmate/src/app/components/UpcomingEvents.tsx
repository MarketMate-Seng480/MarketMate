import { HStack, Spacer } from "@chakra-ui/react";
import React from "react";
import EventCard from "./EventCard";
import { Event } from "../types";

interface UpcomingEventsProps {
  events: Event[];
}

export const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events }) => {
  return (
    <HStack
      spacing={5}
      alignContent={"space-between"}
      justifyContent={"space-between"}
    >
      {events.map((event, index) => (
        <EventCard
          key={event.id || index}
          {...event}
        />
      ))}
    </HStack>
  );
};
