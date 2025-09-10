import { Box, Circle, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { FaCheck } from "react-icons/fa";

export const EventCreationStepper = ({
  activeStep,
  steps,
  onStepClick,
  completedSteps,
}) => {
  return (
    <Flex justify="center" align="center" mb={8} w="100%">
      <HStack spacing={0} maxW="600px" w="100%">
        {steps.map((step, index) => (
          <Flex
            key={index}
            align="center"
            justify="center"
            flex={1}
            position="relative"
          >
            <VStack spacing={2} align="center" zIndex={2}>
              <Circle
                size="12"
                bg={
                  completedSteps.has(index)
                    ? "green.500"
                    : index === activeStep
                    ? "gray.700"
                    : "gray.200"
                }
                color={
                  completedSteps.has(index) || index === activeStep
                    ? "white"
                    : "gray.500"
                }
                cursor={index <= activeStep ? "pointer" : "default"}
                onClick={() => index <= activeStep && onStepClick(index)}
                transition="all 0.3s ease"
                border="3px solid"
                borderColor={
                  completedSteps.has(index)
                    ? "green.500"
                    : index === activeStep
                    ? "gray.700"
                    : "gray.200"
                }
                _hover={
                  index <= activeStep
                    ? {
                        transform: "scale(1.1)",
                        shadow: "lg",
                        bg: completedSteps.has(index)
                          ? "green.600"
                          : index === activeStep
                          ? "gray.800"
                          : "gray.300",
                      }
                    : {}
                }
              >
                {completedSteps.has(index) ? (
                  <FaCheck size="18" />
                ) : (
                  <Text fontSize="md" fontWeight="bold">
                    {index + 1}
                  </Text>
                )}
              </Circle>
              <VStack spacing={1} align="center" maxW="28">
                <Text
                  fontSize="sm"
                  fontWeight="semibold"
                  color={
                    completedSteps.has(index)
                      ? "green.600"
                      : index === activeStep
                      ? "gray.700"
                      : "gray.500"
                  }
                  textAlign="center"
                  lineHeight="1.2"
                >
                  {step.title}
                </Text>
                <Text
                  fontSize="xs"
                  color={
                    completedSteps.has(index)
                      ? "green.500"
                      : index === activeStep
                      ? "gray.600"
                      : "gray.400"
                  }
                  textAlign="center"
                  lineHeight="1.2"
                  display={{ base: "none", md: "block" }}
                >
                  {step.description}
                </Text>
              </VStack>
            </VStack>
            {index < steps.length - 1 && (
              <Box
                position="absolute"
                left="50%"
                top="6"
                right="-50%"
                h="3px"
                bg={
                  completedSteps.has(index)
                    ? "green.400"
                    : index < activeStep
                    ? "gray.600"
                    : "gray.200"
                }
                borderRadius="full"
                transition="all 0.3s ease"
                zIndex={1}
              />
            )}
          </Flex>
        ))}
      </HStack>
    </Flex>
  );
};
