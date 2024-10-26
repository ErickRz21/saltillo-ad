import React from "react";
import EventsByGenre from "./EventsGenre";
import FeaturedEvents from "./FeaturedEvents";

const Ticket: React.FC = () => {
  return (
    <div>
      <FeaturedEvents />
      <EventsByGenre />
    </div>
  );
};

export default Ticket;
