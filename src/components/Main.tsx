import React from "react";
import EventsByGenre from "./EventsGenre";
import FeaturedEvents from "./FeaturedEvents";
import Home from "./home";

const Main: React.FC = () => {
  return (
    <div>
      <Home />
        <FeaturedEvents />
        <EventsByGenre />
    </div>
  );
};

export default Main;
