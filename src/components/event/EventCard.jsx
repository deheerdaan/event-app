import {
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { EventDateBadge } from "../ui/EventDateBadge";

export const EventCard = ({ event, categories, onClick }) => {
  return (
    <Card
      cursor="pointer"
      onClick={onClick}
      height={{ base: "320px", md: "350px" }}
      borderRadius="2xl"
      width="100%"
      overflow="hidden"
      boxSizing="border-box"
      boxShadow="xl"
      transition="all 0.3s ease"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "2xl",
      }}
      position="relative"
      border="1px solid"
      borderColor="purple.200"
    >
      <Flex height="100%" flexDirection="column">
        <Box
          height={{ base: "160px", md: "180px" }}
          overflow="hidden"
          position="relative"
        >
          <Image
            width="100%"
            height="100%"
            objectFit="cover"
            src={event.image}
            alt={event.title}
          />

          <Box
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            bgGradient="linear(to-t, blackAlpha.700, transparent)"
            p={{ base: 3, md: 4 }}
          >
            <Text
              color="white"
              fontWeight="700"
              fontSize={{ base: "lg", md: "xl" }}
              textShadow="2px 2px 4px rgba(0,0,0,0.8)"
              noOfLines={2}
              lineHeight="1.3"
            >
              {event.title}
            </Text>

            {categories && categories.length > 0 && (
              <HStack spacing={1} flexWrap="wrap" mt={2}>
                {categories.slice(0, 3).map((name, index) => {
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
                      px={{ base: 2, md: 3 }}
                      py={1}
                      borderRadius="full"
                      boxShadow="md"
                    >
                      <Text
                        fontSize={{ base: "2xs", md: "xs" }}
                        fontWeight="600"
                        color={colorScheme.color}
                      >
                        {name}
                      </Text>
                    </Box>
                  );
                })}
                {categories.length > 3 && (
                  <Box
                    bg="gray.600"
                    px={{ base: 2, md: 3 }}
                    py={1}
                    borderRadius="full"
                    boxShadow="md"
                  >
                    <Text
                      fontSize={{ base: "2xs", md: "xs" }}
                      fontWeight="600"
                      color="white"
                    >
                      +{categories.length - 3}
                    </Text>
                  </Box>
                )}
              </HStack>
            )}
          </Box>
        </Box>

        <CardBody
          p={{ base: 4, md: 5 }}
          flex="1"
          bg="white"
          bgGradient="linear(135deg, purple.50, blue.50, teal.50)"
        >
          <VStack
            spacing={{ base: 3, md: 4 }}
            alignItems="flex-start"
            height="100%"
          >
            <Box flex="1" width="100%">
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.700"
                lineHeight="1.6"
                noOfLines={3}
                fontWeight="400"
              >
                {event.description}
              </Text>
            </Box>

            <Box width="100%">
              <EventDateBadge
                startTime={event.startTime}
                endTime={event.endTime}
              />
            </Box>
          </VStack>
        </CardBody>
      </Flex>
    </Card>
  );
};
