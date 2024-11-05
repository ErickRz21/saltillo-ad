import useTicketEvents from "../hooks/useTicket";
import { EventType } from "../types/EventType"; // Adjust the path based on your project structure
import Loading from "./Loading";

const FeaturedEvents = () => {
  // Utilize the hook with a specific keyword for fetching events in Monterrey
  const { data: events, loading, error } = useTicketEvents("Mexico");

  if (loading) return <Loading />;
  if (error)
    return (
      <p className="text-center text-red-500">Error fetching events: {error}</p>
    );

  // Slice the events to show (adjust the number as needed)
  const displayedEvents = events.slice(0, 4);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Main Grid Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {displayedEvents.map((event: EventType) => (
          <a
            key={event.id}
            href={event.url}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group overflow-hidden rounded-3xl shadow-lg"
          >
            <img
              src={event.images?.[0]?.url || "/placeholder.jpg"}
              alt={event.name}
              className="h-72 lg:h-[450px] w-full object-cover duration-700 transform group-hover:scale-105"
            />
            {/* Overlayed Info */}
            <div
              className="absolute inset-0 flex flex-col justify-end items-center bg-black/20
             text-white px-4 pb-8 text-center duration-500 hover:bg-indigo-950/60 cursor-pointer"
              id="overlay"
            >
              <h2 className="text-2xl lg:text-4xl">{event.name}</h2>
              <p className="text-lg lg:text-xl font-semibold">
                {event._embedded?.venues?.[0]?.name || "Unknown Venue"}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default FeaturedEvents;
