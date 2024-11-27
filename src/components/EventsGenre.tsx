import React from "react";
import { useParams } from "react-router-dom";
import useTicketEvents from "../hooks/useTicketData";
import EventSlider from "../components/EventSlider";
import Loading from "./Loading";

const EventsByGenre: React.FC = () => {
  const { genre } = useParams(); // Get the genre from the URL
  const { data: events, loading, error } = useTicketEvents(genre || "");

  return (
    <div className="container mx-auto my-8 shadow-xl rounded-3xl">
      <div className="border dark:border-neutral-800 rounded-3xl bg-white dark:bg-neutral-800/90 py-5">
        <h2 className="flex justify-center text-3xl mx-4 font-bold capitalize">
          {genre} Events
        </h2>
        {loading && <Loading />}
        {error && <p>Error: {error}</p>}
        {!loading && events?.length === 0 && (
          <p className="text-center text-red-500 font-bold text-xl my-4">
            No events found.
          </p>
        )}
        {!loading && events?.length > 0 && <EventSlider events={events} />}
      </div>
    </div>
  );
};

export default EventsByGenre;
