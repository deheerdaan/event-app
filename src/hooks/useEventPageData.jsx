import { useMemo } from "react";
import {
  useGlobalCategories,
  useGlobalEvents,
  useGlobalUsers,
} from "../context/DataContext";
import { mapEventWithCategories } from "../utils/categoryUtils";
import { createUserMap } from "../utils/userUtils";
import { useFetchEventById } from "./useFetchEventById";

export const useEventPageData = (eventId) => {
  const {
    users,
    isLoading: usersLoading,
    error: usersError,
  } = useGlobalUsers();
  const {
    event,
    isLoading: eventLoading,
    error: eventError,
    retry: retryEvent,
  } = useFetchEventById(eventId);
  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGlobalCategories();
  const { events: allEvents } = useGlobalEvents();
  const userMap = useMemo(() => createUserMap(users), [users]);
  const eventWithCategories = useMemo(() => {
    if (eventLoading || categoriesLoading || !event) {
      return null;
    }
    return mapEventWithCategories(event, categories);
  }, [event, categories, eventLoading, categoriesLoading]);

  const isLoading = eventLoading || categoriesLoading || usersLoading;
  const hasError = usersError || eventError || categoriesError;

  return {
    eventData: eventWithCategories,
    userMap,
    allEvents,
    categories,
    isLoading,
    hasError,
    eventLoading,
    categoriesLoading,
    usersLoading,
    eventError,
    categoriesError,
    usersError,
    retryEvent,
  };
};
