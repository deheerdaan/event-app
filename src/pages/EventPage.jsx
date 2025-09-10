import { useParams } from "react-router-dom";

import { EventActionButtons } from "../components/event/EventActionButtons";
import { EventErrorState } from "../components/event/EventErrorState";
import { EventPageLayout } from "../components/event/EventPageLayout";
import { EventPageModals } from "../components/event/EventPageModals";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

import { useEventDeletion } from "../hooks/useEventDeletion";
import { useEventPageData } from "../hooks/useEventPageData";
import { useEventPageEditor } from "../hooks/useEventPageEditor";
import { useLocalCategories } from "../hooks/useLocalCategories";
import { getUserDetails } from "../utils/userUtils";

export const EventPage = () => {
  const { eventId } = useParams();

  const {
    eventData,
    userMap,
    allEvents,
    categories,
    isLoading,
    hasError,
    retryEvent,
  } = useEventPageData(eventId);
  const { localCategories, updateCategories } = useLocalCategories(categories);
  const { editModalProps, openModal: openEditModal } = useEventPageEditor(
    eventData,
    retryEvent
  );
  const {
    deleteDialogProps,
    openDialog: openDeleteDialog,
    isDeleting,
  } = useEventDeletion(eventData, allEvents, localCategories);

  if (hasError) {
    return <EventErrorState />;
  }

  if (isLoading || !eventData) {
    return <LoadingSpinner message="Loading event details..." />;
  }

  const userDetails = getUserDetails(eventData.createdBy, userMap);
  const actionButtons = (
    <EventActionButtons
      onEdit={openEditModal}
      onDelete={openDeleteDialog}
      isDeleting={isDeleting}
    />
  );

  return (
    <EventPageLayout
      event={eventData}
      userDetails={userDetails}
      actionButtons={actionButtons}
    >
      <EventPageModals
        editProps={editModalProps}
        deleteProps={deleteDialogProps}
        localCategories={localCategories}
        onCategoriesUpdate={updateCategories}
      />
    </EventPageLayout>
  );
};
