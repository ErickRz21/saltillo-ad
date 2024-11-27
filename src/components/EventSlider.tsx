import React from "react";
import { EventType } from "../types/EventType";
import EventCard from "./EventCard";
import useCarouselScroll from "../hooks/useSliderScroll";

interface EventSliderProps {
  events: EventType[];
}

const EventSlider: React.FC<EventSliderProps> = ({ events }) => {
  const { carouselRef, scroll } = useCarouselScroll();

  // Sort events by date (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.dates.start.localDate).getTime();
    const dateB = new Date(b.dates.start.localDate).getTime();
    return dateA - dateB;
  });

  return (
    <div className="relative flex items-center w-full">
      {/* Card Scroll div */}
      <div
        className="flex gap-3 overflow-x-auto scroll-smooth cursor-grab
        w-screen snap-center justify-start mx-auto my-2 px-4 lg:px-3 py-2"
        ref={carouselRef}
      >
        {sortedEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {/* Arrow Buttons */}
      <button id="arrow" className="left-5" onClick={() => scroll("left")}>
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 5H1m0 0l4 4M1 5l4-4"
          />
        </svg>
        <span className="sr-only">Left</span>
      </button>

      <button id="arrow" className="right-5" onClick={() => scroll("right")}>
        <svg
          className="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
        <span className="sr-only">Next</span>
      </button>
    </div>
  );
};

export default EventSlider;
