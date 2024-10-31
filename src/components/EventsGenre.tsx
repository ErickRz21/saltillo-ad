import { useState } from "react";
import useTicketEvents from "../hooks/useTicket";
import Loading from "./Loading";
import { EventType } from "../types/EventType";
import EventSlider from "./EventSlider";

// Tabs configuration
const tabs = [
  { label: "Music & Festivals ", keyword: "music" },
  { label: "Sports", keyword: "sports" },
  { label: "Arts", keyword: "arts, theatre" },
  { label: "Misc", keyword: "miscellaneous" },
];

// Helper function to validate and filter out events with missing fields
const validEvents = (events: EventType[] | undefined): EventType[] => {
  if (!events) return []; // Handle undefined events gracefully
  return events.filter(
    (event) => event.id && event.name && event.dates?.start?.localDate
  );
};

const EventsByGenre = () => {
  const [activeTab, setActiveTab] = useState(tabs[0].keyword);

  // Fetch events based on the active tab
  const { data, loading, error } = useTicketEvents(activeTab);

  return (
    <div>
      <h2 className="flex justify-center">Search by genre</h2>
      {/* Tabs for selecting event categories */}
      <div className="flex justify-center text-lg lg:text-xl space-x-5 my-5 font-semibold">
        {tabs.map((tab) => (
          <button
            key={tab.keyword}
            onClick={() => setActiveTab(tab.keyword)}
            className={activeTab === tab.keyword ? "font-bold duration-700 text-indigo-400" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Events based on active tab */}
      <div>
        {loading && <Loading />}
        {error && <p>Error: {error}</p>}
        {!loading && !error && data && data.length > 0 && (
          <EventSlider events={validEvents(data)} />
        )}
      </div>
    </div>
  );
};

export default EventsByGenre;
