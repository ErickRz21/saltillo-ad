import { useState } from "react";
import useTicketEvents from "../hooks/useTicket";
import EventCard from "./EventCard";
import { EventType } from "../types/EventType"; // Ensure correct path

const EventsByGenre = () => {
  const [activeTab, setActiveTab] = useState("music");

  // Fetch events using broader keywords instead of strict classifications
  const {
    data: musicEvents,
    loading: musicLoading,
    error: musicError,
  } = useTicketEvents(activeTab === "music" ? "music" : "");

  const {
    data: festivalEvents,
    loading: festivalLoading,
    error: festivalError,
  } = useTicketEvents(activeTab === "festival" ? "festival" : "");

  const {
    data: sportsEvents,
    loading: sportsLoading,
    error: sportsError,
  } = useTicketEvents(activeTab === "sports" ? "sports" : "");

  const {
    data: artsEvents,
    loading: artsLoading,
    error: artsError,
  } = useTicketEvents(activeTab === "arts" ? "arts, theatre" : "");

  const {
    data: miscEvents,
    loading: miscLoading,
    error: miscError,
  } = useTicketEvents(activeTab === "misc" ? "miscellaneous" : "");

  // Function to handle tab change
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  // Function to merge events and filter duplicates
  const mergeEvents = (
    events1: EventType[],
    events2: EventType[]
  ): EventType[] => {
    const combinedEvents = [...events1, ...events2];
    const uniqueEventsMap = new Map<string, EventType>();

    combinedEvents.forEach((event) => {
      if (!uniqueEventsMap.has(event.id)) {
        uniqueEventsMap.set(event.id, event);
      }
    });

    return Array.from(uniqueEventsMap.values());
  };

  // Validate and filter out events that do not have the required fields
  const validEvents = (events: EventType[] | undefined): EventType[] => {
    if (!events) return []; // Handle undefined events gracefully
    return events.filter(
      (event) => event.id && event.name && event.dates?.start?.localDate // Check for required properties
    );
  };

  // Merge Music and Festival Events for example
  const mergedMusicFestivalEvents = mergeEvents(
    validEvents(musicEvents),
    validEvents(festivalEvents)
  );

  return (
    <div>
      {/* Tabs for selecting event categories */}
      <div className="flex justify-center text-base lg:text-lg space-x-4 my-10">
        <button
          onClick={() => handleTabChange("music")}
          className={activeTab === "music" ? "font-bold" : ""}
        >
          Music
        </button>
        <button
          onClick={() => handleTabChange("sports")}
          className={activeTab === "sports" ? "font-bold" : ""}
        >
          Sports
        </button>
        <button
          onClick={() => handleTabChange("arts")}
          className={activeTab === "arts" ? "font-bold" : ""}
        >
          Arts 
        </button>
        <button
          onClick={() => handleTabChange("misc")}
          className={activeTab === "misc" ? "font-bold" : ""}
        >
          Misc
        </button>
      </div>

      {/* Render Events based on active tab */}
      <div className="my-5">
        {activeTab === "music" && (
          <>
            <h2 className="text-2xl font-bold text-center">
              Music & Festivals Events
            </h2>
            {(musicLoading || festivalLoading) && (
              <p>Loading music and festivals events...</p>
            )}
            {(musicError || festivalError) && (
              <p>Error: {musicError || festivalError}</p>
            )}
            {!musicLoading &&
              !festivalLoading &&
              !musicError &&
              !festivalError &&
              mergedMusicFestivalEvents.length > 0 && (
                <EventCard events={mergedMusicFestivalEvents} />
              )}
          </>
        )}

        {activeTab === "sports" && (
          <>
            <h2 className="text-2xl font-bold text-center">
              Sports Events
            </h2>
            {sportsLoading && <p>Loading sports events...</p>}
            {sportsError && <p>Error: {sportsError}</p>}
            {!sportsLoading &&
              !sportsError &&
              sportsEvents &&
              sportsEvents.length > 0 && (
                <EventCard events={validEvents(sportsEvents)} />
              )}
          </>
        )}

        {activeTab === "arts" && (
          <>
            <h2 className="text-2xl font-bold text-center">
              Arts & Theatre Events
            </h2>
            {artsLoading && <p>Loading arts & theatre events...</p>}
            {artsError && <p>Error: {artsError}</p>}
            {!artsLoading &&
              !artsError &&
              artsEvents &&
              artsEvents.length > 0 && (
                <EventCard events={validEvents(artsEvents)} />
              )}
          </>
        )}

        {activeTab === "misc" && (
          <>
            <h2 className="text-2xl font-bold text-center">
              Miscellaneous Events
            </h2>
            {miscLoading && <p>Loading miscellaneous events...</p>}
            {miscError && <p>Error: {miscError}</p>}
            {!miscLoading &&
              !miscError &&
              miscEvents &&
              miscEvents.length > 0 && (
                <EventCard events={validEvents(miscEvents)} />
              )}
          </>
        )}
      </div>
    </div>
  );
};

export default EventsByGenre;
