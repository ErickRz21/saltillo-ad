import React, { useState } from "react";
import EventsByGenre from "./EventsGenre";

const Ticket: React.FC = () => {
  return (
    <div className="container mx-auto">
      {/* Browse by Genre Section */}
      <div>
        <EventsByGenre />
      </div>
    </div>
  );
};

export default Ticket;
