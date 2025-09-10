import { Center, Spinner, Text, VStack } from "@chakra-ui/react";

export const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <Center h="50vh">
      <VStack spacing={{ base: 3, md: 4 }}>
        <Spinner size={{ base: "lg", md: "xl" }} color="gray.600" />
        <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
          {message}
        </Text>
      </VStack>
    </Center>
  );
};
