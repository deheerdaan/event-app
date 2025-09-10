import { Box, Button, Flex } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export const CategoryButtons = ({ categories = [] }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategories =
    searchParams.get("categories")?.split(",").filter(Boolean) || [];

  const handleCategoryClick = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    const categoryIdStr = String(categoryId);

    if (selectedCategories.includes(categoryIdStr)) {
      const remaining = selectedCategories.filter((id) => id !== categoryIdStr);
      if (remaining.length > 0) {
        newParams.set("categories", remaining.join(","));
      } else {
        newParams.delete("categories");
      }
    } else {
      const newSelection = [...selectedCategories, categoryIdStr];
      newParams.set("categories", newSelection.join(","));
    }

    setSearchParams(newParams);
  };

  const handleClearAll = () => {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete("categories");
    setSearchParams(newParams);
  };

  return (
    <Box p={{ base: 3, md: 4 }} borderBottom="1px" borderColor="gray.200">
      <Flex
        gap={{ base: 1, md: 2 }}
        justifyContent="flex-end"
        flexWrap="wrap"
        align="center"
      >
        <Button
          size={{ base: "xs", md: "sm" }}
          variant={selectedCategories.length === 0 ? "solid" : "outline"}
          colorScheme="gray"
          bg={selectedCategories.length === 0 ? "gray.700" : "transparent"}
          color={selectedCategories.length === 0 ? "white" : "gray.700"}
          borderColor="gray.300"
          onClick={handleClearAll}
          fontSize={{ base: "xs", md: "sm" }}
          minW="auto"
          px={{ base: 2, md: 3 }}
          _hover={{
            bg: selectedCategories.length === 0 ? "gray.800" : "gray.100",
            borderColor: "gray.400",
          }}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            size={{ base: "xs", md: "sm" }}
            variant={
              selectedCategories.includes(String(category.id))
                ? "solid"
                : "outline"
            }
            colorScheme="gray"
            bg={
              selectedCategories.includes(String(category.id))
                ? "gray.700"
                : "transparent"
            }
            color={
              selectedCategories.includes(String(category.id))
                ? "white"
                : "gray.700"
            }
            borderColor="gray.300"
            onClick={() => handleCategoryClick(category.id)}
            textTransform="capitalize"
            fontSize={{ base: "xs", md: "sm" }}
            minW="auto"
            px={{ base: 2, md: 3 }}
            _hover={{
              bg: selectedCategories.includes(String(category.id))
                ? "gray.800"
                : "gray.100",
              borderColor: "gray.400",
            }}
          >
            {category.name}
          </Button>
        ))}
      </Flex>
    </Box>
  );
};
