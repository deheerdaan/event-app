import { Box, Card, CardBody, Flex, VStack } from "@chakra-ui/react";

export const EventCardLayout = ({
  onClick,
  hoverProps = {},
  imageSection,
  contentSection,
  footerSection,
}) => {
  const defaultHoverProps = {
    transform: "translateY(-4px)",
    boxShadow: "2xl",
  };

  const combinedHoverProps = { ...defaultHoverProps, ...hoverProps };

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
      _hover={combinedHoverProps}
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
          {imageSection}
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
              {contentSection}
            </Box>

            {footerSection && <Box width="100%">{footerSection}</Box>}
          </VStack>
        </CardBody>
      </Flex>
    </Card>
  );
};
