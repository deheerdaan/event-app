import { useState, useEffect } from "react";

const useFetchEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3000/events");
        const eventsData = await response.json();
        setEvents(eventsData);
      } catch (error) {
        setError(error);
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  return { events, error };
};

export default useFetchEvents;
