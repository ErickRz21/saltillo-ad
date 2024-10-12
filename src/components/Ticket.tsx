// Ticket.tsx
import React, { useState } from "react";
import EventCard from "../components/EventCard"; // Ensure correct path
import { EventType } from "../types/EventType"; // Ensure correct path
import useTicket from "../hooks/useTicket"; // Ensure correct hook path

const Ticket: React.FC = () => {
  const [keyword, setKeyword] = useState<string>("music");
  const { data: events, loading, error } = useTicket(keyword);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Search for events by keyword</h2>

      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Enter keyword"
        className="border p-2 mb-4 w-32 text-black rounded-full"
      />

      {loading && <div>Loading...</div>}
      {error && <div>{error}</div>}

      {!loading && !error && events.length > 0 && (
        <EventCard events={events as EventType[]} />
      )}
    </div>
  );
};

export default Ticket;
