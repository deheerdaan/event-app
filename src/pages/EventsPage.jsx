import { Box, Grid, GridItem, Heading } from "@chakra-ui/react";
import { useEffect } from "react";
import { EventCard } from "../components/event/EventCard";
import useFetchCategories from "../hooks/useFetchCategories";
import useFetchEvents from "../hooks/useFetchEvents";

import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { eventAtom } from "../atoms";

export const EventsPage = () => {
  const { events, eventsError } = useFetchEvents();
  const { categories, categoriesError } = useFetchCategories();

  const navigate = useNavigate();

  const setEvent = useSetAtom(eventAtom);

  useEffect(() => {
    if (eventsError) {
      toast.error(`Error: ${eventsError.message}`);
    }
    if (categoriesError) {
      toast.error(`Error: ${categoriesError.message}`);
    }
  }, [eventsError, categoriesError]);

  const getCategoryNames = (categoryIds) => {
    const categoryNames = categoryIds.map((id) => {
      const category = categories.find(
        (category) => category.id === String(id)
      );
      const name = category ? category.name : undefined;
      return name;
    });
    return categoryNames;
  };

  return (
    <>
      <ToastContainer />
      <Heading>Event</Heading>
      <Box justifyItems={"center"} p={4}>
        <Grid
          border={"2px solid green"}
          justifyItems={"center"}
          gap={4}
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          }}
          maxWidth={"100%"}
          width="100%"
        >
          {events.map((event) => (
            <GridItem key={event.id}>
              <EventCard
                event={event}
                onClick={() => {
                  setEvent(event);
                  navigate(`/event/${event.id}`);
                }}
                categories={getCategoryNames(event.categoryIds)}
              />
            </GridItem>
          ))}
        </Grid>
      </Box>
    </>
  );
};

// also use fetchcategories here maybe
//usememo to make it quicker

//fetch result in atom and in dependency array plaatsen

// use steps to create the new event
// include animations
