import { useState, useEffect } from 'react';

type EventType = {
  id: string;
  name: string;
  dates: { start: { localDate: string } };
  _embedded?: { venues: { name: string }[] };
};

// Custom Hook
const useTicket = (keyword?: string) => {
  const [data, setData] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Use import.meta.env for Vite
  const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!API_KEY) {
          throw new Error("Missing API Key. Make sure VITE_TICKETMASTER_API_KEY is defined in your .env file.");
        }

        const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
        const LAT_LONG = '25.67507,-100.31847'; // Monterrey latitude and longitude
        const RADIUS = 200; // Radius in kilometers

        // Construct the API URL with or without a keyword
        const url = `${BASE_URL}/events?apikey=${API_KEY}&latlong=${LAT_LONG}&radius=${RADIUS}&unit=km&countryCode=MX${
          keyword ? `&keyword=${keyword}` : ""
        }`;

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const result = await response.json();
        setData(result._embedded?.events || []);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    // If no keyword, fetch all events
    if (!keyword) {
      fetchEvents();
    } else {
      // Debounce implementation
      const delayDebounce = setTimeout(() => {
        fetchEvents();
      }, 500); // Set delay time for debounce (e.g., 500ms)

      // Cleanup function to clear timeout if keyword changes before delay ends
      return () => clearTimeout(delayDebounce);
    }
  }, [keyword, API_KEY]);

  return { data, loading, error };
};

export default useTicket;
