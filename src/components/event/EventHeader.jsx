import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";

export const EventHeader = ({ image, title, categories, actionButtons }) => {
  return (
    <Box
      position="relative"
      borderRadius="2xl"
      overflow="hidden"
      mb={12}
      boxShadow="2xl"
    >
      <Image
        src={image}
        alt={title}
        width="100%"
        height={{ base: "300px", md: "450px"}}
        objectFit="cover"
      />

      {actionButtons && (
        <Box
          position="absolute"
          top={{ base: 3, md: 4 }}
          right={{ base: 3, md: 4 }}
          zIndex={2}
        >
          {actionButtons}
        </Box>
      )}

      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        bgGradient="linear(to-t, blackAlpha.800, transparent)"
        p={{ base: 4, md: 6, lg: 8 }}
      >
        <Heading
          color="white"
          fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
          fontWeight="700"
          textShadow="2px 2px 4px rgba(0,0,0,0.5)"
          mb={4}
        >
          {title}
        </Heading>

        {categories && categories.length > 0 && (
          <HStack spacing={2} flexWrap="wrap" maxWidth="100%">
            {categories.map((category, index) => {
              const colors = [
                { bg: "purple.500", color: "white" },
                { bg: "blue.500", color: "white" },
                { bg: "green.500", color: "white" },
                { bg: "orange.500", color: "white" },
                { bg: "pink.500", color: "white" },
                { bg: "teal.500", color: "white" },
              ];
              const colorScheme = colors[index % colors.length];

              return (
                <Box
                  key={index}
                  bg={colorScheme.bg}
                  px={{ base: 3, md: 4 }}
                  py={2}
                  borderRadius="full"
                  mb={{ base: 1, md: 0 }}
                  boxShadow="lg"
                >
                  <Text
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="600"
                    color={colorScheme.color}
                  >
                    {category}
                  </Text>
                </Box>
              );
            })}
          </HStack>
        )}
      </Box>
    </Box>
  );
};
