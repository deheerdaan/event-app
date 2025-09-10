/* eslint-disable no-unused-vars */
import { useCallback, useMemo, useState } from "react";
import { createCategory, createUser } from "../api/eventApi";

export const useTempEntityManager = (categories, users, onSave) => {
  const [tempCategories, setTempCategories] = useState([]);
  const [tempUsers, setTempUsers] = useState([]);

  const allCategories = useMemo(() => {
    return [...categories, ...tempCategories];
  }, [categories, tempCategories]);

  const allUsers = useMemo(() => {
    return [...users, ...tempUsers];
  }, [users, tempUsers]);
  const handleTempCategoryCreate = useCallback((categoryData) => {
    const newCategory = {
      ...categoryData,
      isTemporary: true,
    };
    setTempCategories((prev) => [...prev, newCategory]);
    return newCategory;
  }, []);

  const handleTempUserCreate = useCallback((userData) => {
    const newUser = {
      ...userData,
      isTemporary: true,
    };
    setTempUsers((prev) => [...prev, newUser]);
    return newUser;
  }, []);

  const handleSaveWithTempEntities = useCallback(
    async (eventDataToSave) => {
      const savedCategories = [];
      for (const tempCategory of tempCategories) {
        const { isTemporary, ...categoryData } = tempCategory;
        const savedCategory = await createCategory(categoryData);
        savedCategories.push(savedCategory);
      }

      const savedUsers = [];
      for (const tempUser of tempUsers) {
        const { isTemporary, ...userData } = tempUser;
        const savedUser = await createUser(userData);
        savedUsers.push(savedUser);
      }

      let updatedEventData = { ...eventDataToSave };

      if (savedCategories.length > 0) {
        const categoryIdMapping = {};
        tempCategories.forEach((tempCat, index) => {
          if (savedCategories[index]) {
            categoryIdMapping[tempCat.id] = savedCategories[index].id;
          }
        });

        updatedEventData.categoryIds = eventDataToSave.categoryIds.map(
          (id) => categoryIdMapping[id] || id
        );
      }

      if (savedUsers.length > 0) {
        const userIdMapping = {};
        tempUsers.forEach((tempUser, index) => {
          if (savedUsers[index]) {
            userIdMapping[tempUser.id] = savedUsers[index].id;
          }
        });

        if (userIdMapping[eventDataToSave.createdBy]) {
          updatedEventData.createdBy = userIdMapping[eventDataToSave.createdBy];
        }
      }

      await onSave(updatedEventData);

      setTempCategories([]);
      setTempUsers([]);
    },
    [tempCategories, tempUsers, onSave]
  );

  const clearTempEntities = useCallback(() => {
    setTempCategories([]);
    setTempUsers([]);
  }, []);

  return {
    allCategories,
    allUsers,
    handleTempCategoryCreate,
    handleTempUserCreate,
    handleSaveWithTempEntities,
    clearTempEntities,
  };
};
