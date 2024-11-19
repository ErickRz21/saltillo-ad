import React from "react";
import EventsByGenre from "./EventsGenre";
import FeaturedEvents from "./FeaturedEvents";

const Main: React.FC = () => {
  return (
    <div>
      <FeaturedEvents />
      <EventsByGenre />
    </div>
  );
};

export default Main;
