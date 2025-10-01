import React from "react";
import { useParams } from "react-router-dom";
import useTicketEvents from "../hooks/useTicketData";
import EventSlider from "../components/EventSlider";
import Loading from "./Loading";

const EventsByGenre: React.FC = () => {
  const { genre } = useParams(); // Get the genre from the URL
  const { data: events, loading, error } = useTicketEvents(genre || "");

  return (
    <div className="container mx-auto my-8 rounded-3xl shadow-xl">
      <div className="rounded-3xl border bg-white py-5 dark:border-neutral-800 dark:bg-neutral-800/90">
        <h2 className="mx-4 flex justify-center text-3xl font-bold capitalize">
          {genre} Events
        </h2>
        {loading && <Loading />}
        {error && <p>Error: {error}</p>}
        {!loading && events?.length === 0 && (
          <p className="my-4 text-center text-xl font-bold text-red-500">
            No events found.
          </p>
        )}
        {!loading && events?.length > 0 && <EventSlider events={events} />}
      </div>
    </div>
  );
};

export default EventsByGenre;
