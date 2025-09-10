import { Box, Button, Grid, Text } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CategoryButtons } from "../ui/CategoryButtons";
import { EventCard } from "./EventCard";

export const EventsGrid = ({ events, categories = [] }) => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const hasActiveFilters = searchParams.get("categories");

  const handleClearFilters = () => {
    setSearchParams({});
  };

  if (!events || events.length === 0) {
    return (
      <Box height="100%" display="flex" flexDirection="column">
        <CategoryButtons categories={categories} />
        <Box
          flex="1"
          p={{ base: 3, md: 4 }}
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Box>
            <Text color="gray.500" fontSize={{ base: "sm", md: "md" }}>
              {hasActiveFilters
                ? "No events match your filters"
                : "No events found"}
            </Text>
            {hasActiveFilters && (
              <Button
                mt={2}
                size={{ base: "xs", md: "sm" }}
                onClick={handleClearFilters}
              >
                Clear filters
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box height="100%" display="flex" flexDirection="column">
      <CategoryButtons categories={categories} />
      <Box flex="1" p={{ base: 3, md: 4 }} overflowY="auto">
        <Grid
          gap={{ base: 3, md: 4 }}
          templateColumns={{
            base: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          width="100%"
        >
          {events.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              onClick={() => {
                navigate(`/event/${event.id}`);
              }}
              categories={event.categories}
            />
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
