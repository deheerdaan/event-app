import { useEffect, useMemo, useState } from "react";
import { validateEventData } from "../utils/eventValidation";

export const useEventEditor = (event, onSave, onClose, isOpen) => {
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    image: "",
    location: "",
    startTime: "",
    endTime: "",
    categoryIds: [],
    createdBy: null,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function convertDateForInput(dateString) {
    if (!dateString) {
      return "";
    }
    const date = new Date(dateString);
    return date.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (event && isOpen) {
      setEventData({
        title: event.title || "",
        description: event.description || "",
        image: event.image || "",
        location: event.location || "",
        startTime: convertDateForInput(event.startTime),
        endTime: convertDateForInput(event.endTime),
        categoryIds: event.categoryIds || [],
        createdBy: event.createdBy || null,
      });
      setErrors({});
    }
  }, [event, isOpen]);

  const handleInputChange = (field, value) => {
    setEventData({
      ...eventData,
      [field]: value,
    });

    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const validateData = () => {
    const result = validateEventData(eventData, "all", { isEditing: true });
    setErrors(result.errors);
    return result.isValid;
  };

  const handleSave = async () => {
    const isValid = validateData();
    if (!isValid) {
      return;
    }

    setIsLoading(true);

    try {
      const eventDataToSave = {
        title: eventData.title,
        description: eventData.description,
        image: eventData.image,
        location: eventData.location,
        startTime: new Date(eventData.startTime).toISOString(),
        endTime: new Date(eventData.endTime).toISOString(),
        categoryIds: eventData.categoryIds.map((id) => parseInt(id)),
        createdBy: eventData.createdBy,
      };

      await onSave(eventDataToSave);
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const hasChanges = useMemo(() => {
    if (!event) {
      return false;
    }

    return (
      eventData.title !== (event.title || "") ||
      eventData.description !== (event.description || "") ||
      eventData.image !== (event.image || "") ||
      eventData.location !== (event.location || "") ||
      eventData.startTime !== convertDateForInput(event.startTime) ||
      eventData.endTime !== convertDateForInput(event.endTime) ||
      JSON.stringify(eventData.categoryIds.sort()) !==
        JSON.stringify((event.categoryIds || []).sort())
    );
  }, [eventData, event]);

  return {
    eventData,
    isLoading,
    errors,
    handleInputChange,
    handleSave,
    hasChanges,
  };
};
