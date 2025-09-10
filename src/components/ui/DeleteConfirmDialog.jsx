import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Text,
} from "@chakra-ui/react";
import { useRef } from "react";

export const DeleteConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Item",
  itemName,
  itemType = "item",
  description,
  isLoading,
  loadingText = "Deleting...",
}) => {
  const cancelRef = useRef();

  const defaultDescription = `This action cannot be undone. The ${itemType} will be permanently removed.`;

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent mx={{ base: 2, md: 4 }} my="auto">
          <AlertDialogHeader
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
          >
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text mb={3} fontSize={{ base: "sm", md: "md" }}>
              Are you sure you want to delete{" "}
              {itemName ? (
                <strong>&ldquo;{itemName}&rdquo;</strong>
              ) : (
                `this ${itemType}`
              )}
              ?
            </Text>
            <Text color="red.500" fontSize={{ base: "xs", md: "sm" }}>
              {description || defaultDescription}
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 0 }}
          >
            <Button
              ref={cancelRef}
              onClick={onClose}
              size={{ base: "sm", md: "md" }}
              width={{ base: "100%", sm: "auto" }}
              order={{ base: 2, sm: 1 }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              ml={{ base: 0, sm: 3 }}
              isLoading={isLoading}
              loadingText={loadingText}
              size={{ base: "sm", md: "md" }}
              width={{ base: "100%", sm: "auto" }}
              order={{ base: 1, sm: 2 }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
