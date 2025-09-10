import { Button, HStack, Icon } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const EventActionButtons = ({
  onEdit,
  onDelete,
  isDeleting = false,
}) => {
  return (
    <HStack spacing={3}>
      <Button
        onClick={onEdit}
        size={{ base: "sm", md: "md" }}
        bg="whiteAlpha.900"
        color="gray.700"
        _hover={{
          bg: "white",
          transform: "translateY(-1px)",
          boxShadow: "lg",
          color: "gray.800",
        }}
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.300"
        fontWeight="500"
        borderRadius="lg"
        px={6}
        transition="all 0.2s ease"
        leftIcon={<Icon as={FaEdit} />}
        disabled={isDeleting}
      >
        Edit
      </Button>
      <Button
        onClick={onDelete}
        size={{ base: "sm", md: "md" }}
        bg="whiteAlpha.900"
        color="gray.700"
        _hover={{
          bg: "red.50",
          transform: "translateY(-1px)",
          boxShadow: "lg",
          color: "red.600",
          borderColor: "red.200",
        }}
        backdropFilter="blur(10px)"
        border="1px solid"
        borderColor="whiteAlpha.300"
        fontWeight="500"
        borderRadius="lg"
        px={6}
        transition="all 0.2s ease"
        leftIcon={<Icon as={FaTrash} />}
        disabled={isDeleting}
        isLoading={isDeleting}
      >
        Delete
      </Button>
    </HStack>
  );
};
