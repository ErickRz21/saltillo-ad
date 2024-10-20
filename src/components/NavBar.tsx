import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaSearch, FaTimes } from "react-icons/fa";
import useTicketEvents from "../hooks/useTicket";
import useFormatDate from "../hooks/useFormatDate";
import Loading from "./Loading";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);

  const {
    data: events,
    loading,
    error,
    fetchEvents,
  } = useTicketEvents(searchQuery);

  function handleSearch() {
    console.log("Searching for:", searchQuery);
    fetchEvents();
  }

  const handleEnterKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent default form submission behavior
      searchInputRef.current?.blur(); // Hide the keyboard
      handleSearch(); // Optionally trigger the search
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node) &&
      searchOpen
    ) {
      setSearchOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchOpen]);

  return (
    <nav
      className="fixed bottom-0 mx-3 my-2 lg:my-4 left-0 right-0 lg:sticky lg:top-0 z-40
     bg-white dark:bg-neutral-900 py-4 lg:py-4 rounded-3xl shadow-lg
      border dark:border-neutral-800"
    >
      <div className="container mx-auto flex items-center justify-between px-6 lg:px-0 relative">
        {/* Mobile search and menu toggle */}

        <button
          onClick={() => {
            setSearchOpen(!searchOpen);
            if (searchOpen) setSearchOpen(false);
          }}
          className="lg:hidden"
          aria-label="Toggle Search"
        >
          <FaSearch size={25} className="text-black dark:text-white" />
        </button>
        <Link
          to="/"
          className="text-xl lg:text-2xl uppercase font-bold text-black dark:text-white"
        >
          MONTERREY
        </Link>

        <ul className="space-x-24 pr-11 text-xl hidden lg:flex justify-center">
          <li>Menu</li>
          <li>Menu</li>
          <li>Menu</li>
          <li>Menu</li>
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden"
          aria-label="Toggle Menu"
        >
          <FaBars size={25} className="text-black dark:text-white" />
        </button>

        {/* Desktop icons */}
        <div className="hidden lg:flex space-x-4 text-black dark:text-white items-center">
          <Link to="/">
            <FaUser size={20} />
          </Link>
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
              if (searchOpen) setSearchOpen(false);
            }}
            className="hover:text-neutral-600 duration-300"
          >
            <FaSearch size={20} />
          </button>
        </div>
      </div>

      {/* Search Bar for Mobile and Desktop */}
      <div
        ref={searchBarRef}
        className={`absolute ${
          searchOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
        } my-3 lg:my-2 w-full lg:right-0 lg:w-2/4 h-[34rem] lg:h-[40rem] bg-white dark:bg-neutral-900
        shadow-lg p-4 border dark:border-neutral-800 rounded-3xl z-50 overflow-y-auto transform transition-all duration-200
        ${
          searchOpen
            ? window.innerWidth >= 1024
              ? "top-16"
              : "bottom-14"
            : window.innerWidth >= 1024
            ? "top-16"
            : "bottom-14"
        }`}
        style={{
          transformOrigin: window.innerWidth >= 1024 ? "top" : "bottom",
        }}
      >
        <div className="flex items-center sticky top-0">
          <input
            type="text"
            value={searchQuery}
            ref={searchInputRef}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleEnterKey}
            className="w-full py-3 px-5 mb-1 rounded-3xl bg-neutral-100 dark:bg-neutral-800
            opacity-70 focus:opacity-100 duration-500 text-black dark:text-white outline-none
            font-semibold text-lg"
            placeholder="Search for events..."
          />

          {/* Clear Button */}
          <button
            type="button"
            onClick={() => {
              setSearchQuery(""); // Clear the search input
              // setSearchOpen(false); // Close the search bar
            }}
            className="absolute right-4 text-neutral-600 dark:text-white"
            aria-label="Clear search"
          >
            <FaTimes size={18} />
          </button>
        </div>

        {/* Display Loading, Error, and Search Results */}
        {loading && (
          <Loading/>
        )}
        {error && <p className="text-center text-red-500 font-bold mt-2">{error}</p>}

        <div className="mt-3">
          {events.length > 0 ? (
            <ul className="space-y-4">
              {events.map((event) => {
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
                    <div className="w-full lg:w-2/4 text-neutral-600 dark:text-neutral-300 font-semibold">
                      <h3 className="font-extrabold text-xl lg:text-2xl text-gray-800 dark:text-white mb-2">
                        {event.name}
                      </h3>
                      <p>
                        <span>Date:</span>{" "}
                        {formattedDate || "TBA"}
                      </p>
                      <p>
                        <span>Venue:</span>{" "}
                        {event._embedded?.venues[0]?.name || "TBA"}
                      </p>
                      <p>
                        <span>Price:</span>{" "}
                        {event.priceRanges
                          ? `${event.priceRanges[0].min} - ${event.priceRanges[0].max} ${event.priceRanges[0].currency}`
                          : "N/A"}
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
          ) : (
            !loading && (
              <p className="text-center text-gray-500 mt-4">
                No events found matching your search.
              </p>
            )
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
