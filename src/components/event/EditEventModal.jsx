import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useEventEditor } from "../../hooks/useEventEditor";
import { SaveModalActions } from "../ui/ModalActions";
import { EventFormFields } from "./EventFormFields";

export const EditEventModal = ({
  isOpen,
  onClose,
  event,
  categories,
  onSave,
  onCategoriesUpdate,
}) => {
  const {
    eventData,
    isLoading,
    errors,
    handleInputChange,
    handleSave,
    hasChanges,
  } = useEventEditor(event, onSave, onClose, isOpen);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size={{ base: "full", md: "2xl" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent
        mx={{ base: 2, md: "auto" }}
        overflowY="auto"
        maxHeight="calc(100vh - 32px)"
      >
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
          Edit Event
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={{ base: 4, md: 6 }}>
          <EventFormFields
            eventData={eventData}
            onFieldChange={handleInputChange}
            categories={categories}
            onCategoriesUpdate={onCategoriesUpdate}
            errors={errors}
          />
        </ModalBody>

        <SaveModalActions
          onCancel={onClose}
          onSave={handleSave}
          isLoading={isLoading}
          saveText="Save Changes"
          loadingText="Saving..."
          isDisabled={!hasChanges}
        />
      </ModalContent>
    </Modal>
  );
};
