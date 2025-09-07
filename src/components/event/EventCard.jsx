import {
  Badge,
  Box,
  Card,
  CardBody,
  Flex,
  HStack,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { FaCalendarCheck, FaCalendarTimes } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { formatEventDate } from "../../utils/DateUtils";

export const EventCard = ({ event, categories, onClick }) => {
  return (
    <>
      <ToastContainer />
      <Card
        cursor={"pointer"}
        onClick={onClick}
        height={"400px"}
        borderRadius={"8px"}
        width={"100%"}
        overflow={"hidden"}
        boxSizing="border-box"
        _hover={{
          boxShadow: "lg",
        }}
      >
        <Flex height={"100%"} flexDirection={"column"}>
          <Box flex={1} overflow={"hidden"}>
            <Image
              width={"100%"}
              height={"100%"}
              objectFit={"cover"}
              src={event.image}
            />
          </Box>
          <Box p={1} flex={2}>
            <CardBody>
              <VStack spacing={2} alignItems={"left"}>
                <VStack alignItems={"left"} spacing={0}>
                  <Text fontWeight={"semibold"} fontSize={"2xl"}>
                    {event.title}
                  </Text>
                  <Text fontSize={"medium"} fontStyle={"italic"}>
                    {event.description}
                  </Text>
                </VStack>
                <HStack>
                  {categories.map((name, index) => (
                    <Badge gap={1} p={1} variant={"subtle"} key={index}>
                      {name}
                    </Badge>
                  ))}
                </HStack>
                <Box position={"absolute"} bottom={5}>
                  <HStack alignContent={"center"}>
                    <Icon color={"green"}>
                      <FaCalendarCheck size={"2xl"} />
                    </Icon>
                    <Text>{formatEventDate(event.startTime)}</Text>
                  </HStack>
                  <HStack alignContent={"center"}>
                    <Icon color={"red"}>
                      <FaCalendarTimes size={"2xl"} />
                    </Icon>
                    <Text>{formatEventDate(event.endTime)}</Text>
                  </HStack>
                </Box>
              </VStack>
            </CardBody>
          </Box>
        </Flex>
      </Card>
    </>
  );
};
