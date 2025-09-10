import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";

export const EventCreatorCard = ({ userDetails }) => {
  return (
    <Box
      bg="white"
      bgGradient="linear(135deg, purple.100, blue.100)"
      borderRadius="xl"
      p={{ base: 3, md: 4 }}
      border="1px solid"
      borderColor="purple.200"
      mb={{ base: 4, md: 6 }}
      boxShadow="lg"
    >
      <HStack spacing={{ base: 2, md: 3 }}>
        <Avatar
          size={{ base: "md", md: "lg" }}
          src={userDetails.image}
          name={userDetails.name}
          border="3px solid"
          borderColor="purple.300"
          boxShadow="md"
        />
        <VStack spacing={0} align="flex-start">
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            fontWeight="600"
            color="purple.700"
          >
            {userDetails.name}
          </Text>
          <Text
            fontSize={{ base: "2xs", md: "xs" }}
            color="purple.500"
            fontStyle="italic"
          >
            Event creator
          </Text>
        </VStack>
      </HStack>
    </Box>
  );
};
