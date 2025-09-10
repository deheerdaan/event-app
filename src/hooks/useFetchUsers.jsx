import { useFetch } from "./useFetch";

export const useFetchUsers = () => {
  const {
    data: users,
    isLoading,
    error,
    retry,
  } = useFetch("/users", {
    initialValue: [],
  });

  return { users, isLoading, error, retry };
};
