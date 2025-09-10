import { Box, Container, Flex } from "@chakra-ui/react";
import { EventDateBadge } from "../ui/EventDateBadge";
import { EventCreatorCard } from "./EventCreatorCard";
import { EventDescription } from "./EventDescription";
import { EventHeader } from "./EventHeader";

export const EventPageLayout = ({
  event,
  userDetails,
  actionButtons,
  children,
}) => {
  if (!event) {
    return null;
  }

  return (
    <Box
      bgGradient="linear(to-br, purple.50, blue.50, teal.50)"
      position="relative"
      minH="100%"
    >
      <Container maxW="7xl" py={{ base: 4, md: 8 }} px={{ base: 4, md: 6 }}>
        <EventHeader
          image={event.image}
          title={event.title}
          categories={event.categories}
          actionButtons={actionButtons}
        />

        <Flex
          direction={{ base: "column", lg: "row" }}
          gap={{ base: 6, md: 8, lg: 12 }}
          align="flex-start"
        >
          <Box
            flex={{ base: "1", lg: "1" }}
            minW={{ base: "100%", lg: "300px" }}
          >
            <EventCreatorCard userDetails={userDetails} />

            <EventDateBadge
              startTime={event.startTime}
              endTime={event.endTime}
            />
          </Box>

          <Box
            flex={{ base: "1", lg: "2" }}
            minW="0"
            w={{ base: "100%", lg: "auto" }}
          >
            <EventDescription description={event.description} />
          </Box>
        </Flex>
      </Container>

      {children}
    </Box>
  );
};
