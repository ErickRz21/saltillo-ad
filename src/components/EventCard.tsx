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
      {/* Card Scroll div */}
      <div
        className="flex gap-2 overflow-x-auto scroll-smooth cursor-grab
        w-screen snap-center justify-start mx-auto px-[15.3%] lg:px-3 py-5"
        ref={carouselRef}
      >
        {events.map((event) => {
          // Destructure localDate and localTime from each event's dates
          const { localDate, localTime } = event.dates.start;
          const formattedDate = useFormatDate(localDate, localTime);

          return (
            // Card Styling
            <div
              key={event.id}
              className="min-w-[260px] max-w-[260px] lg:min-w-[325px] lg:max-w-[325px] h-[360px] lg:h-[420px]
              flex flex-col items-center justify-center shadow-md rounded-xl
              bg-white dark:bg-neutral-800"
            >
              {event.images && event.images[0] && (
                <img
                  className="w-full h-full object-cover rounded-t-xl"
                  src={event.images[0].url}
                  alt={event.name}
                />
              )}
              <div className="px-5 py-1 lg:py-2 w-full text-neutral-700 dark:text-white text-sm text-center font-semibold">
                <div className="font-extrabold text-base lg:text-lg mb-1 text-center text-blue-600 dark:text-white">
                  {event.name}
                </div>
                <p>
                  <span>Date:</span> {formattedDate}
                </p>
                {event._embedded?.venues &&
                  event._embedded.venues.length > 0 && (
                    <p>
                      <span>Venue:</span> {event._embedded.venues[0].name}
                    </p>
                  )}
                {event.priceRanges && event.priceRanges.length > 0 && (
                  <p>
                    <span>Price: </span>
                    {event.priceRanges && event.priceRanges.length > 0 ? (
                      <>
                        ${event.priceRanges[0].min} - $
                        {event.priceRanges[0].max}{" "}
                        {event.priceRanges[0].currency}
                      </>
                    ) : (
                      <span>Price not available</span>
                    )}
                  </p>
                )}
                <button className="flex justify-end my-3 w-full">
                  {event.url && (
                    <a
                      href={event.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-bold border-2 border-blue-600 text-blue-600 px-3 py-2 rounded-md
                        hover:bg-blue-600 hover:text-white transition-colors duration-200"
                    >
                      More info
                    </a>
                  )}
                </button>
              </div>
            </div>
          );
        })}
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

export default EventCard;
