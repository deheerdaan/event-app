import {
  Box,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { FaSearch, FaTimes } from "react-icons/fa";

export const SearchBar = ({
  placeholder = "Search events...",
  value,
  onChange,
  size = "md",
}) => {
  const handleClear = () => {
    onChange("");
  };

  return (
    <Box
      width={{ base: "200px", sm: "250px", md: "300px", lg: "400px" }}
      display={{ base: "none", sm: "block" }}
    >
      <InputGroup size={size}>
        <InputLeftElement pointerEvents="none">
          <Icon as={FaSearch} color="gray.400" />
        </InputLeftElement>
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          bg="white"
          borderColor="gray.300"
          borderRadius="lg"
          _hover={{
            borderColor: "gray.400",
          }}
          _focus={{
            borderColor: "gray.600",
            boxShadow: "0 0 0 1px gray.600",
          }}
          transition="all 0.2s"
        />
        {value && (
          <InputRightElement>
            <IconButton
              aria-label="Clear search"
              icon={<Icon as={FaTimes} />}
              size="sm"
              variant="ghost"
              color="gray.400"
              _hover={{ color: "gray.600" }}
              onClick={handleClear}
            />
          </InputRightElement>
        )}
      </InputGroup>
    </Box>
  );
};
