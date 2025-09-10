import { useEffect, useState } from "react";

export const useLocalCategories = (globalCategories = []) => {
  const [localCategories, setLocalCategories] = useState([]);

  useEffect(() => {
    if (
      globalCategories &&
      globalCategories.length > 0 &&
      localCategories.length === 0
    ) {
      setLocalCategories(globalCategories);
    }
  }, [globalCategories, localCategories.length]);

  const updateCategories = (updatedCategories) => {
    setLocalCategories(updatedCategories);
  };

  const syncWithGlobal = () => {
    if (globalCategories && globalCategories.length > 0) {
      setLocalCategories(globalCategories);
    }
  };
  const categoriesToUse =
    localCategories.length > 0 ? localCategories : globalCategories;

  return {
    localCategories: categoriesToUse,
    updateCategories,
    syncWithGlobal,
    hasLocalChanges:
      localCategories.length > 0 && localCategories !== globalCategories,
  };
};
