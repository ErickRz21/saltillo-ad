import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaUser, FaSearch, FaTimes } from "react-icons/fa";
import useTicketEvents from "../hooks/useTicket";
import SearchResults from "./SearchResults";

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

        {/* Display Search Results */}
        <SearchResults loading={loading} error={error} events={events} />
      </div>
    </nav>
  );
};

export default NavBar;
