import { Button, ModalFooter } from "@chakra-ui/react";

export const SaveModalActions = ({
  onCancel,
  onSave,
  isLoading = false,
  saveText = "Save",
  loadingText = "Saving...",
  isDisabled = false,
}) => {
  return (
    <ModalFooter
      flexDirection={{ base: "column", sm: "row" }}
      gap={{ base: 2, sm: 0 }}
    >
      <Button
        variant="ghost"
        mr={{ base: 0, sm: 3 }}
        onClick={onCancel}
        size={{ base: "sm", md: "md" }}
        width={{ base: "100%", sm: "auto" }}
        order={{ base: 2, sm: 1 }}
      >
        Cancel
      </Button>
      <Button
        colorScheme="gray"
        bg="gray.700"
        color="white"
        onClick={onSave}
        isLoading={isLoading}
        loadingText={loadingText}
        isDisabled={isDisabled || isLoading}
        size={{ base: "sm", md: "md" }}
        width={{ base: "100%", sm: "auto" }}
        order={{ base: 1, sm: 2 }}
        _hover={{
          bg: isDisabled ? "gray.700" : "gray.800",
        }}
        _disabled={{
          bg: "gray.400",
          color: "gray.600",
          cursor: "not-allowed",
          _hover: {
            bg: "gray.400",
          },
        }}
      >
        {saveText}
      </Button>
    </ModalFooter>
  );
};
