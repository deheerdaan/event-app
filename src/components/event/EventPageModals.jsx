import { DeleteConfirmDialog } from "../ui/DeleteConfirmDialog";
import { EditEventModal } from "./EditEventModal";

export const EventPageModals = ({
  editProps,
  deleteProps,
  localCategories,
  onCategoriesUpdate,
}) => {
  return (
    <>
      <EditEventModal
        {...editProps}
        categories={localCategories}
        onCategoriesUpdate={onCategoriesUpdate}
      />

      <DeleteConfirmDialog {...deleteProps} />
    </>
  );
};
