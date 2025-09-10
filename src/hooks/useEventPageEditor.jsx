import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { updateEvent } from "../api/eventApi";
import { useData } from "../context/DataContext";

export const useEventPageEditor = (eventData, retryEvent) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const { invalidateEvents } = useData();

  const openModal = useCallback(() => {
    setIsEditModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsEditModalOpen(false);
  }, []);

  const editEvent = useCallback(
    async (updatedEventData) => {
      if (!eventData?.id) {
        toast.error("Event ID not found");
        return;
      }

      try {
        await updateEvent(eventData.id, updatedEventData);
        setIsEditModalOpen(false);

        invalidateEvents();
        if (retryEvent) {
          await retryEvent();
        }
        setTimeout(() => {
          toast.success("Event updated successfully!");
        }, 100);
      } catch (error) {
        toast.error("Failed to update event. Please try again.");
      }
    },
    [eventData?.id, invalidateEvents, retryEvent]
  );

  return {
    isEditModalOpen,
    openModal,
    closeModal,
    editEvent,
    editModalProps: {
      isOpen: isEditModalOpen,
      onClose: closeModal,
      event: eventData,
      onSave: editEvent,
    },
  };
};
