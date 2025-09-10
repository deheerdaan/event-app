import { Box, Heading, Text } from "@chakra-ui/react";

export const EventErrorState = () => {
  return (
    <Box
      p={{ base: 3, md: 4 }}
      textAlign="center"
      minH="100vh"
      bgGradient="linear(to-br, red.50, pink.50)"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        bg="white"
        p={8}
        borderRadius="xl"
        boxShadow="xl"
        border="1px solid"
        borderColor="red.200"
      >
        <Heading size={{ base: "sm", md: "md" }} color="red.500" mb={2}>
          Error Loading Event
        </Heading>
        <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
          Something went wrong. Please try refreshing the page.
        </Text>
      </Box>
    </Box>
  );
};
