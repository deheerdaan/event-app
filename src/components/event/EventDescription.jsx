import { Box, Heading, Text } from "@chakra-ui/react";

export const EventDescription = ({ description }) => {
  return (
    <Box
      mb={{ base: 6, md: 8, lg: 10 }}
      bg="white"
      p={{ base: 4, sm: 6, md: 8 }}
      borderRadius="xl"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
      w="100%"
      overflow="hidden"
    >
      <Heading
        size={{ base: "md", sm: "lg", md: "xl" }}
        mb={{ base: 3, sm: 4, md: 6 }}
        color="teal.700"
        fontWeight="700"
        borderLeft="6px solid"
        borderColor="teal.400"
        pl={{ base: 3, sm: 4, md: 6 }}
        bgGradient="linear(to-r, teal.600, blue.600)"
        bgClip="text"
      >
        About This Event
      </Heading>
      <Text
        fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
        lineHeight={{ base: "1.6", md: "1.8" }}
        color="gray.700"
        fontWeight="400"
        wordBreak="break-word"
        overflowWrap="break-word"
      >
        {description}
      </Text>
    </Box>
  );
};
