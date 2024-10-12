import { useState, useEffect } from 'react';

type EventType = {
  id: string;
  name: string;
  dates: { start: { localDate: string } };
  _embedded?: { venues: { name: string }[] };
};

// Custom Hook
const useTicket = (keyword: string) => {
  const [data, setData] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
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
        const response = await fetch(
          `${BASE_URL}/events?apikey=${API_KEY}&keyword=${keyword}&city=Monterrey&countryCode=MX`
        );
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

    if (keyword) {
      fetchEvents();
    }
  }, [keyword, API_KEY]);

  return { data, loading, error };
};

export default useTicket;
