import { useFetch } from "./useFetch";

export const useFetchEvents = () => {
  const {
    data: events,
    isLoading,
    error,
    retry,
  } = useFetch("/events", {
    initialValue: [],
  });

  return { events, isLoading, error, retry };
};
