import { useEffect, useMemo } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import { EventsGrid } from "../components/event/EventsGrid";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useGlobalCategories, useGlobalEvents } from "../context/DataContext";
import { mapEventsWithCategories } from "../utils/categoryUtils";

export const EventsPage = () => {
  const [searchParams] = useSearchParams();
  const { searchQuery } = useOutletContext();
  const categoryFilter = useMemo(() => {
    return searchParams.get("categories")?.split(",").filter(Boolean) || [];
  }, [searchParams]);

  const {
    events,
    isLoading: eventsLoading,
    error: eventsError,
  } = useGlobalEvents();

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useGlobalCategories();

  const eventsWithCategories = useMemo(() => {
    if (eventsLoading || categoriesLoading) {
      return events?.map((event) => ({ ...event, categories: [] })) || [];
    }
    return mapEventsWithCategories(events, categories);
  }, [events, categories, eventsLoading, categoriesLoading]);

  const filteredEvents = useMemo(() => {
    let filtered = eventsWithCategories;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((event) =>
        event.title?.toLowerCase().includes(query)
      );
    }

    if (categoryFilter.length > 0) {
      const numericCategoryFilter = categoryFilter.map((id) => Number(id));
      filtered = filtered.filter((event) =>
        event.categoryIds?.some((categoryId) =>
          numericCategoryFilter.includes(Number(categoryId))
        )
      );
    }

    return filtered;
  }, [eventsWithCategories, searchQuery, categoryFilter]);

  const isLoading = categoriesLoading || eventsLoading;
  const hasError = eventsError || categoriesError;

  useEffect(() => {
    if (hasError) {
      toast.error("Error loading data. Please try again.");
    }
  }, [hasError]);

  if (isLoading && !hasError) {
    return <LoadingSpinner message="Loading events..." />;
  }

  return <EventsGrid events={filteredEvents} categories={categories} />;
};
