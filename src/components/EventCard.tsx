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
    <div className="relative flex items-center w-screen lg:w-full">
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

      <div
        className="flex gap-2 overflow-x-auto overflow-y-hidden scroll-smooth cursor-grab
        w-screen snap-center justify-start px-3 py-2"
        ref={carouselRef}
      >
        {events.map((event) => {
          // Destructure localDate and localTime from each event's dates
          const { localDate, localTime } = event.dates.start;
          const formattedDate = useFormatDate(localDate, localTime);

          return (
            <div
              key={event.id}
              className="min-w-[260px] max-w-[260px] lg:min-w-[325px] lg:max-w-[325px] h-[360px] lg:h-[400px]
              flex flex-col items-center justify-center shadow-md
             rounded-xl bg-gradient-to-br from-blue-300 to-white dark:to-black"
            >
              {event.images && event.images[0] && (
                <img
                  className="w-full h-full object-cover rounded-t-xl"
                  src={event.images[0].url}
                  alt={event.name}
                />
              )}
              <div className="px-5 py-1 lg:py-2 w-full">
                <div className="font-bold text-lg mb-1 text-center text-blue-600 dark:text-white">
                  {event.name}
                </div>
                <p className="text-gray-700 dark:text-white text-sm text-center">
                  Date: <span>{formattedDate}</span>
                </p>
                {event._embedded?.venues &&
                  event._embedded.venues.length > 0 && (
                    <p className="text-gray-700 dark:text-white text-sm text-center">
                      Venue: <span>{event._embedded.venues[0].name}</span>
                    </p>
                  )}
                {event.priceRanges && event.priceRanges.length > 0 && (
                  <p className="text-gray-700 dark:text-white text-sm text-center">
                    <span>
                      Price: {" "}
                      {event.priceRanges && event.priceRanges.length > 0 ? (
                        <>
                          ${event.priceRanges[0].min} - $
                          {event.priceRanges[0].max}{" "}
                          {event.priceRanges[0].currency}
                        </>
                      ) : (
                        <span>Price not available</span>
                      )}
                    </span>
                  </p>
                )}
                <p className="text-right my-4 lg:my-4">
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-base lg:text-sm border-2 border-blue-600 text-blue-600 p-2 rounded-md
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

export default EventCard;
