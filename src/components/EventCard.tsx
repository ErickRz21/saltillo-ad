import React, { useRef, useEffect } from "react";
import { EventType } from "../types/EventType";
import useFormatDate from "../hooks/useFormatDate";

interface EventCardProps {
  events: EventType[];
}

const EventCard: React.FC<EventCardProps> = ({ events }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const scrollAmount = 600;
      carouselRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const carouselElement = carouselRef.current;
    if (carouselElement) {
      let isDragging = false;
      let startX: number;
      let scrollLeft: number;

      const handleDragStart = (e: MouseEvent) => {
        e.preventDefault();
        isDragging = true;
        startX = e.pageX - carouselElement.offsetLeft;
        scrollLeft = carouselElement.scrollLeft;
      };

      const handleDragMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carouselElement.offsetLeft;
        const walk = (x - startX) * 2.5; // Adjust scroll speed
        carouselElement.scrollLeft = scrollLeft - walk;
      };

      const handleDragEnd = () => {
        isDragging = false;
      };

      carouselElement.addEventListener("mousedown", handleDragStart);
      carouselElement.addEventListener("mousemove", handleDragMove);
      carouselElement.addEventListener("mouseup", handleDragEnd);
      carouselElement.addEventListener("mouseleave", handleDragEnd);

      return () => {
        carouselElement.removeEventListener("mousedown", handleDragStart);
        carouselElement.removeEventListener("mousemove", handleDragMove);
        carouselElement.removeEventListener("mouseup", handleDragEnd);
        carouselElement.removeEventListener("mouseleave", handleDragEnd);
      };
    }
  }, []);

  return (
    <div className="relative flex items-center w-full pt-10">
      <button
        className="absolute left-5 bg-white text-black border border-gray-300 opacity-60 
        hover:opacity-80 duration-200 rounded-full shadow-lg p-3 cursor-pointer z-10 
        text-2xl top-1/2 transform -translate-y-1/2 hidden lg:block"
        onClick={() => scroll("left")}
      >
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
      <div
        className="flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth cursor-grab 
        px-10 w-screen snap-center"
        ref={carouselRef}
      >
        {events.map((event) => {
          // Destructure localDate and localTime from each event's dates
          const { localDate, localTime } = event.dates.start;
          const formattedDate = useFormatDate(localDate, localTime);

          return (
            <div
              key={event.id}
              className="min-w-[325px] h-[400px] flex flex-col items-center justify-center shadow-md
             rounded-lg bg-gradient-to-br from-blue-300 to-white"
            >
              {event.images && event.images[0] && (
                <img
                  className="w-full h-full object-cover rounded-t-lg"
                  src={event.images[0].url}
                  alt={event.name}
                />
              )}
              <div className="px-5 py-2 w-full">
                <div className="font-bold text-lg mb-1 text-center text-blue-600">
                  {event.name}
                </div>
                <p className="text-gray-700 text-sm text-center">
                  Date: <span>{formattedDate}</span>
                </p>
                {event._embedded?.venues &&
                  event._embedded.venues.length > 0 && (
                    <p className="text-gray-700 text-sm text-center">
                      Venue: <span>{event._embedded.venues[0].name}</span>
                    </p>
                  )}
                {event.priceRanges && event.priceRanges.length > 0 && (
                  <p className="text-gray-700 text-sm text-center">
                    Price:{" "}
                    <span>
                      ${event.priceRanges[0].min} - ${event.priceRanges[0].max}{" "}
                      {event.priceRanges[0].currency}
                    </span>
                  </p>
                )}
                <p className="text-right">
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm my-2 border border-blue-600 text-blue-600 px-2 py-1 rounded-md
                      hover:bg-blue-600 hover:text-white duration-200"
                    >
                      More info
                    </a>
                  )}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="absolute right-5 bg-white text-black opacity-60 hover:opacity-80 duration-300 
        border border-gray-300 rounded-full shadow-lg p-3 cursor-pointer z-10 
        text-2xl top-1/2 transform -translate-y-1/2 hidden lg:block"
        onClick={() => scroll("right")}
      >
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

export default EventCard;
