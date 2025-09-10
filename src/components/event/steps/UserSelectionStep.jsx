import {
  Alert,
  AlertIcon,
  Avatar,
  Box,
  Button,
  Flex,
  HStack,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { FormField } from "../../ui/FormField";

export const UserSelectionStep = ({
  eventData,
  onFieldChange,
  users = [],
  onTempUserCreate,
  errors = {},
}) => {
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [newUserData, setNewUserData] = useState({
    name: "",
    image: "",
  });
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [userErrors, setUserErrors] = useState({});

  const handleUserChange = (userId) => {
    const numericUserId =
      typeof userId === "string" ? parseInt(userId, 10) : userId;
    onFieldChange("createdBy", numericUserId);
  };

  const handleAddUserClick = () => {
    setIsAddingUser(true);
    setUserErrors({});
  };

  const handleCancelAddUser = () => {
    setIsAddingUser(false);
    setNewUserData({ name: "", image: "" });
    setUserErrors({});
  };

  const handleNewUserFieldChange = (field, value) => {
    setNewUserData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (userErrors[field]) {
      setUserErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateUserData = () => {
    const errors = {};

    if (!newUserData.name.trim()) {
      errors.name = "Name is required";
    }

    if (newUserData.image && !isValidUrl(newUserData.image)) {
      errors.image = "Please enter a valid URL";
    }

    setUserErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleCreateUser = async () => {
    if (!validateUserData()) {
      return;
    }

    const existingUser = users.find(
      (user) =>
        user.name.toLowerCase() === newUserData.name.trim().toLowerCase()
    );

    if (existingUser) {
      setUserErrors({ name: "User with this name already exists" });
      return;
    }

    setIsCreatingUser(true);
    setUserErrors({});

    try {
      const maxId = users.reduce((max, user) => {
        const numId =
          typeof user.id === "number" ? user.id : parseInt(user.id, 10);
        return isNaN(numId) ? max : Math.max(max, numId);
      }, 0);
      const nextId = maxId + 1;

      const newUser = {
        id: nextId,
        name: newUserData.name.trim(),
        image:
          newUserData.image.trim() ||
          "https://via.placeholder.com/150/CCCCCC/FFFFFF?text=User",
      };

      onTempUserCreate(newUser);

      onFieldChange("createdBy", newUser.id);

      setNewUserData({ name: "", image: "" });
      setIsAddingUser(false);
    } catch (error) {
      setUserErrors({ general: "Failed to create user. Please try again." });
    } finally {
      setIsCreatingUser(false);
    }
  };

  return (
    <VStack spacing={{ base: 4, md: 5 }} align="stretch">
      <Box>
        <Text
          fontSize={{ base: "lg", md: "xl" }}
          fontWeight="semibold"
          color="gray.700"
          mb={2}
        >
          Select Event Creator
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
          Choose who will be credited as the creator of this event.
        </Text>
      </Box>

      {errors.createdBy && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {errors.createdBy}
        </Alert>
      )}

      {userErrors.general && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {userErrors.general}
        </Alert>
      )}

      <Box>
        <RadioGroup
          value={eventData.createdBy ? eventData.createdBy.toString() : ""}
          onChange={handleUserChange}
        >
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 3, md: 4 }}>
            {users.map((user) => (
              <Box
                key={user.id}
                position="relative"
                cursor="pointer"
                onClick={() => handleUserChange(user.id)}
              >
                <Radio
                  value={user.id.toString()}
                  colorScheme="gray"
                  _checked={{
                    "& .chakra-radio__control": {
                      backgroundColor: "gray.700",
                      borderColor: "gray.700",
                    },
                  }}
                  p={4}
                  borderRadius="lg"
                  border="2px"
                  borderColor={
                    eventData.createdBy === user.id ? "gray.700" : "gray.200"
                  }
                  bg={eventData.createdBy === user.id ? "gray.50" : "white"}
                  _hover={{
                    borderColor: "gray.400",
                    bg: "gray.50",
                  }}
                  _focus={{
                    boxShadow: "0 0 0 3px rgba(0, 0, 0, 0.1)",
                  }}
                  transition="all 0.2s"
                  width="100%"
                >
                  <HStack spacing={3} align="center" width="100%">
                    <Avatar
                      src={user.image}
                      name={user.name}
                      size="md"
                      bg="gray.300"
                      color="gray.600"
                    />
                    <VStack align="start" spacing={0} flex={1}>
                      <Text
                        fontSize={{ base: "md", md: "lg" }}
                        color="gray.700"
                        fontWeight="semibold"
                      >
                        {user.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        Event Creator
                      </Text>
                    </VStack>
                  </HStack>
                </Radio>
              </Box>
            ))}
          </SimpleGrid>
        </RadioGroup>
      </Box>

      <Box borderTop="1px" borderColor="gray.200" pt={4}>
        {!isAddingUser ? (
          <Button
            variant="outline"
            colorScheme="gray"
            borderColor="gray.300"
            color="gray.700"
            onClick={handleAddUserClick}
            size={{ base: "sm", md: "md" }}
            _hover={{
              bg: "gray.100",
              borderColor: "gray.400",
            }}
          >
            + Add New User
          </Button>
        ) : (
          <VStack spacing={4} align="stretch">
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <FormField
                label="User Name"
                field="name"
                value={newUserData.name}
                onChange={handleNewUserFieldChange}
                error={userErrors.name}
                placeholder="Enter user name"
                isRequired
              />

              <FormField
                label="Profile Image URL"
                field="image"
                value={newUserData.image}
                onChange={handleNewUserFieldChange}
                error={userErrors.image}
                placeholder="https://example.com/image.jpg (optional)"
              />
            </SimpleGrid>

            <Flex gap={2} justify="flex-start">
              <Button
                colorScheme="gray"
                bg="gray.700"
                color="white"
                onClick={handleCreateUser}
                isLoading={isCreatingUser}
                loadingText="Creating..."
                size={{ base: "sm", md: "md" }}
                _hover={{
                  bg: "gray.800",
                }}
                isDisabled={!newUserData.name.trim()}
              >
                Create User
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancelAddUser}
                size={{ base: "sm", md: "md" }}
                color="gray.600"
                _hover={{
                  bg: "gray.100",
                }}
              >
                Cancel
              </Button>
            </Flex>
          </VStack>
        )}
      </Box>
    </VStack>
  );
};
