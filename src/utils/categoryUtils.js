const mapEventWithCategoriesInternal = (event, categoryMap) => ({
  ...event,
  categories:
    event.categoryIds?.map((id) => {
      const numericId = Number(id);
      const categoryName = categoryMap[numericId];
      if (!categoryName) {
        // eslint-disable-next-line no-console
        console.warn(
          `Category with ID ${numericId} not found in categories list`
        );
        return "Unknown Category";
      }
      return categoryName;
    }) || [],
});

export const mapEventsWithCategories = (events, categories) => {
  if (!events?.length) {
    return events || [];
  }
  if (!categories?.length) {
    return events.map((event) => ({
      ...event,
      categories: [],
    }));
  }

  const categoryMap = categories.reduce((map, category) => {
    map[Number(category.id)] = category.name;
    return map;
  }, {});

  return events.map((event) =>
    mapEventWithCategoriesInternal(event, categoryMap)
  );
};

export const mapEventWithCategories = (event, categories) => {
  if (!event) {
    return event;
  }
  if (!categories?.length) {
    return {
      ...event,
      categories: [],
    };
  }

  const categoryMap = categories.reduce((map, category) => {
    map[Number(category.id)] = category.name;
    return map;
  }, {});

  return mapEventWithCategoriesInternal(event, categoryMap);
};

export const findUnusedCategories = (
  deletedEventCategories,
  remainingEvents,
  allCategories
) => {
  if (!deletedEventCategories?.length || !allCategories?.length) {
    return [];
  }

  const usedCategoryIds = new Set();
  remainingEvents.forEach((event) => {
    if (event.categoryIds) {
      event.categoryIds.forEach((categoryId) => {
        usedCategoryIds.add(Number(categoryId));
      });
    }
  });

  const unusedCategories = deletedEventCategories.filter((categoryId) => {
    return !usedCategoryIds.has(Number(categoryId));
  });

  return unusedCategories;
};
