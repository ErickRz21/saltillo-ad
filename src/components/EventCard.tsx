import React from "react";
import { EventType } from "../types/EventType";
import useFormatDate from "../hooks/useFormatDate";

interface EventCardProps {
  event: EventType;
}

const EventCard: React.FC<EventCardProps> = ({ event }) => {
  // Destructure localDate and localTime from each event's dates
  const { localDate, localTime } = event.dates.start;
  const formattedDate = useFormatDate(localDate, localTime);

  return (
    <div
      className="min-w-[260px] max-w-[260px] lg:min-w-[300px] lg:max-w-[300px] h-[400px] lg:h-[430px]
      flex flex-col items-center justify-center shadow-md rounded-3xl border border-neutral-200 dark:border-neutral-700
    bg-white dark:bg-neutral-800 overflow-hidden"
    >
      {event.images && event.images[0] && (
        <img
          className="w-full h-full object-cover"
          src={event.images[0].url}
          alt={event.name}
        />
      )}
      <div className="px-5 py-1 lg:py-2 w-full text-neutral-700 dark:text-white text-sm lg:text-base text-center font-semibold">
        <div className="font-extrabold text-base lg:text-lg text-center text-indigo-600 dark:text-indigo-400 overflow-ellipsis overflow-hidden whitespace-nowrap">
          {event.name}
        </div>
        <p>
          <span>Date:</span> {formattedDate}
        </p>
        {event._embedded?.venues && event._embedded.venues.length > 0 && (
          <p>
            <span>Venue:</span> {event._embedded.venues[0].name}
          </p>
        )}
        <p>
          <span>Price: </span>
          {event.priceRanges &&
          event.priceRanges.length > 0 &&
          typeof event.priceRanges[0].min === "number" &&
          typeof event.priceRanges[0].max === "number" ? (
            <>
              ${event.priceRanges[0].min} - ${event.priceRanges[0].max}{" "}
              {event.priceRanges[0].currency || ""}
            </>
          ) : (
            "N/A"
          )}
        </p>
        <button className="flex justify-end my-3 w-full">
          {event.url && (
            <a href={event.url} target="_blank" rel="noreferrer" id="more-info">
              More info
            </a>
          )}
        </button>
      </div>
    </div>
  );
};

export default EventCard;
