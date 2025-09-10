import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteCategory, deleteEvent } from "../api/eventApi";
import { useData } from "../context/DataContext";
import { findUnusedCategories } from "../utils/categoryUtils";

export const useEventDeletion = (eventData, allEvents, localCategories) => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { invalidateEvents, invalidateCategories } = useData();

  const openDialog = useCallback(() => {
    setIsDeleteDialogOpen(true);
  }, []);

  const closeDialog = useCallback(() => {
    setIsDeleteDialogOpen(false);
  }, []);

  const cleanupUnusedCategories = useCallback(
    async (deletedEventCategories, eventId) => {
      if (!deletedEventCategories.length || !allEvents?.length) {
        return;
      }

      try {
        const numericEventId = parseInt(eventId, 10);
        const remainingEvents = allEvents.filter(
          (event) => event.id !== numericEventId
        );

        const unusedCategories = findUnusedCategories(
          deletedEventCategories,
          remainingEvents,
          localCategories
        );

        if (unusedCategories.length > 0) {
          await Promise.all(
            unusedCategories.map((categoryId) => deleteCategory(categoryId))
          );
          invalidateCategories();
        }
      } catch (categoryError) {
        // eslint-disable-next-line no-console
        console.error(categoryError);
      }
    },
    [allEvents, localCategories, invalidateCategories]
  );

  const confirmDelete = useCallback(async () => {
    if (!eventData?.id) {
      toast.error("Event ID not found");
      return;
    }

    setIsDeleting(true);
    let eventDeleted = false;

    try {
      const deletedEventCategories = eventData.categoryIds || [];

      await deleteEvent(eventData.id);
      eventDeleted = true;

      invalidateEvents();

      await cleanupUnusedCategories(deletedEventCategories, eventData.id);

      toast.success("Event deleted successfully!");
      navigate("/");
    } catch (error) {
      if (eventDeleted) {
        invalidateEvents();
        toast.success("Event deleted successfully!");
        navigate("/");
      } else {
        toast.error("Failed to delete event. Please try again.");
      }
    } finally {
      setIsDeleting(false);
      setIsDeleteDialogOpen(false);
    }
  }, [eventData, invalidateEvents, cleanupUnusedCategories, navigate]);

  return {
    isDeleteDialogOpen,
    isDeleting,

    openDialog,
    closeDialog,
    confirmDelete,

    deleteDialogProps: {
      isOpen: isDeleteDialogOpen,
      onClose: closeDialog,
      onConfirm: confirmDelete,
      title: "Delete Event",
      itemName: eventData?.title || "this event",
      itemType: "event",
      isLoading: isDeleting,
    },
  };
};
