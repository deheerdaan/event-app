import {
  Badge,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { formatEventDate } from "../../utils/dateUtils";

const DateBadge = ({ icon, label, date, colorScheme = "gray" }) => {
  const useVerticalLayout = useBreakpointValue({ base: true, xl: false });
  const showFullLabel = useBreakpointValue({ base: false, "2xl": true });

  if (!date) {
    return null;
  }

  const formatCompactDate = (date) => {
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) {
      return "Invalid";
    }

    if (!showFullLabel) {
      return new Intl.DateTimeFormat("en-GB", {
        day: "numeric",
        month: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
        .format(dateObj)
        .replace(/,\s*/, " ");
    }

    return formatEventDate(date);
  };

  const shortLabel = label === "Starts" ? "Start" : "End";
  const displayLabel = showFullLabel ? label : shortLabel;

  return (
    <Badge
      bg={`${colorScheme}.100`}
      color={`${colorScheme}.700`}
      display="inline-flex"
      alignItems="center"
      px={{ base: 1, md: 2, xl: 3 }}
      py={{ base: 1, md: 1.5, xl: 2 }}
      borderRadius="lg"
      border="2px solid"
      borderColor={`${colorScheme}.300`}
      minWidth={0}
      flex="1"
      maxWidth="100%"
      boxShadow="md"
      overflow="hidden"
      minH="auto"
    >
      {useVerticalLayout ? (
        <VStack spacing={0.5} minWidth={0} flex="1" align="center">
          <Icon
            as={icon}
            color={`${colorScheme}.600`}
            boxSize={{ base: 3, md: 3.5 }}
            flexShrink={0}
          />
          <Text
            fontSize={{ base: "9px", md: "10px" }}
            fontWeight="600"
            textAlign="center"
            lineHeight="1"
            minWidth={0}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {formatCompactDate(date)}
          </Text>
        </VStack>
      ) : (
        <HStack spacing={{ base: 1, md: 1.5, xl: 2 }} minWidth={0} flex="1">
          <Icon
            as={icon}
            color={`${colorScheme}.600`}
            boxSize={{ base: 2.5, md: 3, xl: 3.5 }}
            flexShrink={0}
          />
          <VStack spacing={0} align="flex-start" minWidth={0} flex="1">
            {!showFullLabel && (
              <Text
                fontSize={{ lg: "9px", xl: "10px" }}
                fontWeight="500"
                color={`${colorScheme}.600`}
                lineHeight="1"
                textTransform="uppercase"
              >
                {displayLabel}
              </Text>
            )}
            <Text
              fontSize={{ lg: "11px", xl: "13px" }}
              fontWeight="600"
              lineHeight="1"
              minWidth={0}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {showFullLabel ? `${displayLabel}: ` : ""}
              {formatCompactDate(date)}
            </Text>
          </VStack>
        </HStack>
      )}
    </Badge>
  );
};

export const EventDateBadge = ({ startTime, endTime }) => {
  const stackDirection = "row";

  if (!startTime && !endTime) {
    return null;
  }

  return (
    <Stack
      spacing={{ base: 1, md: 2, xl: 3 }}
      direction={stackDirection}
      align="stretch"
      width="100%"
    >
      {startTime && (
        <DateBadge
          icon={FaCalendarCheck}
          label="Starts"
          date={startTime}
          colorScheme="green"
        />
      )}

      {endTime && (
        <DateBadge
          icon={FaCalendarTimes}
          label="Ends"
          date={endTime}
          colorScheme="orange"
        />
      )}
    </Stack>
  );
};
