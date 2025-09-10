import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Flex,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";

import { FormField } from "../../ui/FormField";

export const CategorySelectionStep = ({
  eventData,
  onFieldChange,
  categories = [],
  onTempCategoryCreate,
  errors = {},
}) => {
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isCreatingCategory, setIsCreatingCategory] = useState(false);
  const [categoryError, setCategoryError] = useState("");

  const handleCategoryChange = (selectedIds) => {
    const numericIds = selectedIds.map((id) => parseInt(id));
    onFieldChange("categoryIds", numericIds);
  };

  const handleAddCategoryClick = () => {
    setIsAddingCategory(true);
    setCategoryError("");
  };

  const handleCancelAddCategory = () => {
    setIsAddingCategory(false);
    setNewCategoryName("");
    setCategoryError("");
  };

  const handleCreateCategory = async () => {
    if (!newCategoryName.trim()) {
      setCategoryError("Category name is required");
      return;
    }

    const existingCategory = categories.find(
      (cat) => cat.name.toLowerCase() === newCategoryName.trim().toLowerCase()
    );

    if (existingCategory) {
      setCategoryError("Category already exists");
      return;
    }

    setIsCreatingCategory(true);
    setCategoryError("");

    try {
      const maxId = categories.reduce((max, cat) => {
        const numId =
          typeof cat.id === "number" ? cat.id : parseInt(cat.id, 10);
        return isNaN(numId) ? max : Math.max(max, numId);
      }, 0);
      const nextId = maxId + 1;

      const newCategory = {
        id: nextId,
        name: newCategoryName.trim().toLowerCase(),
      };

      onTempCategoryCreate(newCategory);

      const currentIds = eventData.categoryIds || [];
      const updatedCategoryIds = [...currentIds, parseInt(newCategory.id)];
      onFieldChange("categoryIds", updatedCategoryIds);

      setNewCategoryName("");
      setIsAddingCategory(false);
    } catch (error) {
      setCategoryError("Failed to create category. Please try again.");
    } finally {
      setIsCreatingCategory(false);
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
          Select Categories
        </Text>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600" mb={4}>
          Choose categories that best describe your event. You can select
          multiple categories.
        </Text>
      </Box>

      {errors.categoryIds && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {errors.categoryIds}
        </Alert>
      )}

      <Box>
        <CheckboxGroup
          value={(eventData.categoryIds || []).map((id) => String(id))}
          onChange={handleCategoryChange}
        >
          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={{ base: 2, md: 3 }}>
            {categories.map((category) => (
              <Checkbox
                key={category.id}
                value={String(category.id)}
                colorScheme="gray"
                borderColor="gray.300"
                _checked={{
                  "& .chakra-checkbox__control": {
                    backgroundColor: "gray.700",
                    borderColor: "gray.700",
                  },
                }}
              >
                <Text
                  textTransform="capitalize"
                  fontSize={{ base: "sm", md: "md" }}
                  color="gray.700"
                >
                  {category.name}
                </Text>
              </Checkbox>
            ))}
          </SimpleGrid>
        </CheckboxGroup>
      </Box>

      <Box borderTop="1px" borderColor="gray.200" pt={4}>
        {!isAddingCategory ? (
          <Button
            variant="outline"
            colorScheme="gray"
            borderColor="gray.300"
            color="gray.700"
            onClick={handleAddCategoryClick}
            size={{ base: "sm", md: "md" }}
            _hover={{
              bg: "gray.100",
              borderColor: "gray.400",
            }}
          >
            + Add New Category
          </Button>
        ) : (
          <VStack spacing={3} align="stretch">
            <FormField
              label="New Category Name"
              field="newCategory"
              value={newCategoryName}
              onChange={(field, value) => setNewCategoryName(value)}
              error={categoryError}
              placeholder="Enter category name"
              isRequired
            />

            <Flex gap={2} justify="flex-start">
              <Button
                colorScheme="gray"
                bg="gray.700"
                color="white"
                onClick={handleCreateCategory}
                isLoading={isCreatingCategory}
                loadingText="Creating..."
                size={{ base: "sm", md: "md" }}
                _hover={{
                  bg: "gray.800",
                }}
                isDisabled={!newCategoryName.trim()}
              >
                Create Category
              </Button>

              <Button
                variant="ghost"
                onClick={handleCancelAddCategory}
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
