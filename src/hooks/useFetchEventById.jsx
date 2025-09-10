import { useFetch } from "./useFetch";

export const useFetchEventById = (eventId) => {
  const endpoint = eventId ? `/events/${eventId}` : null;

  const { data: event, isLoading, error, retry } = useFetch(endpoint);

  return { event, isLoading, error, retry };
};
