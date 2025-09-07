import { Heading, Text, Box, Flex, Image } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { eventAtom } from "../atoms";

export const EventPage = () => {
  const [currentEvent] = useAtom(eventAtom);
  return (
    <>
      <Heading>Event</Heading>
      <Flex
        direction={{ base: "column", md: "row" }}
        gap={4}
        px={{ base: 2, md: 4 }}
        py={4}
        mx={{ base: 2, md: 4 }}
        maxH="600px"
        height="600px"
      >
        {/* Event Image */}
        <Box flex="1" height="100%" maxH="600px">
          <Image
            src={currentEvent.image}
            width="100%"
            height="100%"
            borderRadius="8px"
            objectFit="cover"
          />
        </Box>

        <Box flex="1" display="flex" flexDirection="column" height="100%">
          <Box bg="blue.100" borderRadius="8px" p={4} mb={2}>
            <Heading fontSize={{ base: "lg", md: "xl" }}>
              {currentEvent.title}
            </Heading>
            <Text fontStyle="italic" fontSize={{ base: "md", md: "lg" }}>
              {currentEvent.description}
            </Text>
          </Box>

          <Box bg="gray.100" p={4} borderRadius="8px" overflowY="auto" flex="1">
            <Text fontSize={{ base: "md", md: "lg" }}>
              {currentEvent.description}
            </Text>
          </Box>
        </Box>
      </Flex>
    </>
  );
};

// startTime & endTime, categories and by who it’s created (name, image)

// Create an “Edit” button that allows the user to edit the details shown on the page. You can open it in a modal, or the same page, etc. Use a form to edit the data.



// Update the data on the server after saving newly made edits.

// Show a message on success or on failure. This can be done e.g. in the form of a toast(opens in a new tab).

// Add a delete button that allows the user to delete the event.

// Add an extra check and warning to make sure that the user is 100% sure they want to delete the event

// Sent a delete request to the server after confirmation.

// Redirect the user back to the events page
