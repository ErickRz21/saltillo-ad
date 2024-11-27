import React from "react";
import { useParams } from "react-router-dom";
import useTicketEvents from "../hooks/useTicketData";
import EventSlider from "../components/EventSlider";
import Loading from "./Loading";

const EventsByGenre: React.FC = () => {
  const { genre } = useParams(); // Get the genre from the URL
  const { data: events, loading, error } = useTicketEvents(genre || "");

  return (
    <div className="container mx-auto my-10">
      <div className="border dark:border-neutral-800 rounded-3xl bg-neutral-50 dark:bg-neutral-800/90 py-5">
        <h2 className="flex justify-center text-3xl mx-4 font-bold capitalize mb-4">{genre} Events</h2>
        {loading && <Loading />}
        {error && <p>Error: {error}</p>}
        {!loading && events?.length === 0 && <p className="text-red-500 mx-5 text-xl">No events found.</p>}
        {!loading && events?.length > 0 && <EventSlider events={events} />}
      </div>
    </div>
  );
};

export default EventsByGenre;
