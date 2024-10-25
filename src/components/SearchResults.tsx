import useFormatDate from "../hooks/useFormatDate";
import Loading from "./Loading";

interface SearchResultsProps {
  loading: boolean;
  error: string | null;
  events: any[]; // Adjust the type according to your event structure
}

  

const SearchResults: React.FC<SearchResultsProps> = ({
  loading,
  error,
  events,
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500 font-bold mt-2">{error}</p>;
  }

  if (events.length === 0) {
    return (
      <p className="text-center text-gray-500 font-bold text-lg mt-4">
        No events found matching your search.
      </p>
    );
  }

  // Sort events by date (earliest to latest)
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(a.dates.start.localDate).getTime();
    const dateB = new Date(b.dates.start.localDate).getTime();
    return dateA - dateB;
  });

  return (
    <ul className="space-y-4 mt-3">
      {sortedEvents.map((event) => {
        const { localDate, localTime } = event.dates.start;
        const formattedDate = useFormatDate(localDate, localTime);

        return (
          <li
            key={event.id}
            className="bg-neutral-100 dark:bg-neutral-800 p-5 rounded-3xl border dark:border-neutral-800 shadow-md flex flex-col
            lg:flex-row items-center lg:items-start space-y-3 lg:space-y-0 lg:space-x-6"
          >
            {/* Event Image */}
            <div className="w-full lg:w-3/5">
              <img
                src={event.images?.[0]?.url}
                alt={event.name}
                className="w-full h-52 lg:h-64 object-cover rounded-2xl border dark:border-neutral-600 shadow"
              />
            </div>

            {/* Event Details */}
            <div className="w-full lg:w-3/5 text-neutral-600 dark:text-neutral-300 font-semibold">
              <h3 className="font-extrabold text-xl lg:text-2xl text-gray-800 dark:text-white mb-2">
                {event.name}
              </h3>
              <p>
                <span>Date:</span> {formattedDate || "TBA"}
              </p>
              <p>
                <span>Venue:</span> {event._embedded?.venues[0]?.name || "TBA"}
              </p>
              <p>
                <span>Price:</span>{" "}
                {event.priceRanges
                  ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
                  : "N/A"}
              </p>
              <p>
                <span>Genre:</span> {event.classifications[0].genre.name}
              </p>
              <p>
                <span>Subgenre:</span>{" "}
                {event.classifications[0].subGenre?.name || "N/A"}
              </p>

              {/* More Info Button */}
              <button className="my-5">
                <a
                  href={event.url}
                  target="_blank"
                  rel="noreferrer"
                  id="more-info"
                >
                  More Info
                </a>
              </button>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default SearchResults;
