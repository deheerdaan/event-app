import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const DataContext = createContext();

const CACHE_DURATION = 5 * 60 * 1000;

export function DataProvider({ children }) {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(false);
  const [categoriesError, setCategoriesError] = useState(null);
  const [categoriesLastFetch, setCategoriesLastFetch] = useState(null);

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [usersError, setUsersError] = useState(null);
  const [usersLastFetch, setUsersLastFetch] = useState(null);

  const [events, setEvents] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState(null);
  const [eventsLastFetch, setEventsLastFetch] = useState(null);

  const fetchCategories = useCallback(async () => {
    const now = Date.now();

    if (
      categoriesLastFetch !== null &&
      categories.length > 0 &&
      now - categoriesLastFetch < CACHE_DURATION
    ) {
      return categories;
    }

    if (categoriesLoading) {
      return categories;
    }

    setCategoriesLoading(true);
    setCategoriesError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/categories`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      setCategories(data);
      setCategoriesLastFetch(now);
      return data;
    } catch (error) {
      setCategoriesError(error.message);
      throw error;
    } finally {
      setCategoriesLoading(false);
    }
  }, [categories, categoriesLoading, categoriesLastFetch]);

  const fetchUsers = useCallback(async () => {
    const now = Date.now();

    if (
      usersLastFetch !== null &&
      users.length > 0 &&
      now - usersLastFetch < CACHE_DURATION
    ) {
      return users;
    }

    if (usersLoading) {
      return users;
    }

    setUsersLoading(true);
    setUsersError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/users`);

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data);
      setUsersLastFetch(now);
      return data;
    } catch (error) {
      setUsersError(error.message);
      throw error;
    } finally {
      setUsersLoading(false);
    }
  }, [users, usersLoading, usersLastFetch]);

  const fetchEvents = useCallback(async () => {
    const now = Date.now();

    if (
      eventsLastFetch !== null &&
      events.length > 0 &&
      now - eventsLastFetch < CACHE_DURATION
    ) {
      return events;
    }

    if (eventsLoading) {
      return events;
    }

    setEventsLoading(true);
    setEventsError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/events`);

      if (!response.ok) {
        throw new Error(`Failed to fetch events: ${response.statusText}`);
      }

      const data = await response.json();
      setEvents(data);
      setEventsLastFetch(now);
      return data;
    } catch (error) {
      setEventsError(error.message);
      throw error;
    } finally {
      setEventsLoading(false);
    }
  }, [events, eventsLoading, eventsLastFetch]);

  const invalidateCategories = useCallback(() => {
    setCategoriesLastFetch(null);
  }, []);

  const invalidateUsers = useCallback(() => {
    setUsersLastFetch(null);
  }, []);

  const invalidateEvents = useCallback(() => {
    setEventsLastFetch(null);
  }, []);

  // Clear error functions
  const clearCategoriesError = useCallback(() => {
    setCategoriesError(null);
  }, []);

  const clearUsersError = useCallback(() => {
    setUsersError(null);
  }, []);

  const clearEventsError = useCallback(() => {
    setEventsError(null);
  }, []);

  const value = {
    categories,
    users,
    events,

    categoriesLoading,
    usersLoading,
    eventsLoading,

    categoriesError,
    usersError,
    eventsError,

    categoriesLastFetch,
    usersLastFetch,
    eventsLastFetch,

    fetchCategories,
    fetchUsers,
    fetchEvents,

    invalidateCategories,
    invalidateUsers,
    invalidateEvents,

    clearCategoriesError,
    clearUsersError,
    clearEventsError,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
}

export function useGlobalCategories() {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    fetchCategories,
    clearCategoriesError,
    categoriesLastFetch,
  } = useData();

  useEffect(() => {
    if (
      !categoriesLoading &&
      ((categories.length === 0 && !categoriesError) ||
        categoriesLastFetch === null)
    ) {
      fetchCategories();
    }
  }, [
    categories.length,
    categoriesLoading,
    categoriesError,
    fetchCategories,
    categoriesLastFetch,
  ]);

  return {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
    retry: fetchCategories,
    clearError: clearCategoriesError,
  };
}

export function useGlobalUsers() {
  const {
    users,
    usersLoading,
    usersError,
    fetchUsers,
    clearUsersError,
    usersLastFetch,
  } = useData();

  useEffect(() => {
    if (
      !usersLoading &&
      ((users.length === 0 && !usersError) || usersLastFetch === null)
    ) {
      fetchUsers();
    }
  }, [users.length, usersLoading, usersError, fetchUsers, usersLastFetch]);

  return {
    users,
    isLoading: usersLoading,
    error: usersError,
    retry: fetchUsers,
    clearError: clearUsersError,
  };
}

export function useGlobalEvents() {
  const {
    events,
    eventsLoading,
    eventsError,
    fetchEvents,
    clearEventsError,
    invalidateEvents,
    eventsLastFetch,
  } = useData();

  useEffect(() => {
    if (
      !eventsLoading &&
      ((events.length === 0 && !eventsError) || eventsLastFetch === null)
    ) {
      fetchEvents();
    }
  }, [events.length, eventsLoading, eventsError, fetchEvents, eventsLastFetch]);

  return {
    events,
    isLoading: eventsLoading,
    error: eventsError,
    retry: fetchEvents,
    clearError: clearEventsError,
    invalidate: invalidateEvents,
  };
}
