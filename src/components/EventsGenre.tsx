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
      {/* Tabs for selecting event categories */}
      <div className="flex justify-center text-base lg:text-lg space-x-4 my-10">
        {tabs.map((tab) => (
          <button
            key={tab.keyword}
            onClick={() => setActiveTab(tab.keyword)}
            className={activeTab === tab.keyword ? "font-bold" : ""}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Render Events based on active tab */}
      <div className="my-5">
        <h2 className="text-2xl font-bold text-center">
          {tabs.find((tab) => tab.keyword === activeTab)?.label} Events
        </h2>
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
