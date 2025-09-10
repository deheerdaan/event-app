export function validateEventData(eventData, step = "all", options = {}) {
  const { isEditing = false } = options;
  const errors = {};

  if (step === "all" || step === 1) {
    if (!eventData.title || !eventData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!eventData.description || !eventData.description.trim()) {
      errors.description = "Description is required";
    }

    if (!eventData.image || !eventData.image.trim()) {
      errors.image = "Image URL is required";
    }

    if (!eventData.startTime) {
      errors.startTime = "Start date and time is required";
    }

    if (!eventData.endTime) {
      errors.endTime = "End date and time is required";
    }

    if (eventData.startTime && eventData.endTime) {
      const startDate = new Date(eventData.startTime);
      const endDate = new Date(eventData.endTime);
      const now = new Date();

      if (!isEditing && startDate <= now) {
        errors.startTime = "Start time cannot be in the past";
      }

      if (endDate <= startDate) {
        errors.endTime = "End time must be after start time";
      }
    }
  }

  if (step === "all" || step === 2) {
    if (!eventData.categoryIds || eventData.categoryIds.length === 0) {
      errors.categoryIds = "Please select at least one category";
    }
  }

  if (step === "all" || step === 3) {
    if (!eventData.createdBy) {
      errors.createdBy = "Please select an event creator";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors,
  };
}
