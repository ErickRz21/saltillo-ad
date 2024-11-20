import React from "react";
import EventsByGenre from "./EventsGenre";
import FeaturedEvents from "./FeaturedEvents";
import Home from "./Home";
import Footer from "./footer";

const Main: React.FC = () => {
  return (
    <div>
      <Home />
        <FeaturedEvents />
        <EventsByGenre />
        <Footer />
    </div>
  );
};

export default Main;
