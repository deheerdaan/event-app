import { CategorySelectionStep } from "./steps/CategorySelectionStep";
import { EventDetailsStep } from "./steps/EventDetailsStep";
import { UserSelectionStep } from "./steps/UserSelectionStep";

export const EventFormRenderer = ({
  activeStep,
  eventData,
  onFieldChange,
  errors,
  allCategories,
  allUsers,
  onTempCategoryCreate,
  onTempUserCreate,
}) => {
  switch (activeStep) {
    case 0:
      return (
        <EventDetailsStep
          eventData={eventData}
          onFieldChange={onFieldChange}
          errors={errors}
        />
      );
    case 1:
      return (
        <CategorySelectionStep
          eventData={eventData}
          onFieldChange={onFieldChange}
          categories={allCategories}
          onTempCategoryCreate={onTempCategoryCreate}
          errors={errors}
        />
      );
    case 2:
      return (
        <UserSelectionStep
          eventData={eventData}
          onFieldChange={onFieldChange}
          users={allUsers}
          onTempUserCreate={onTempUserCreate}
          errors={errors}
        />
      );
    default:
      return null;
  }
};
