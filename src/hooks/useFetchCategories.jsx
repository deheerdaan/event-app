import { useFetch } from "./useFetch";

export const useFetchCategories = () => {
  const {
    data: categories,
    isLoading,
    error,
    retry,
  } = useFetch("/categories", {
    initialValue: [],
  });

  return { categories, isLoading, error, retry };
};
