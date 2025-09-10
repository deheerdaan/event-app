import {
  Box,
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useMemo } from "react";
import { useGlobalCategories, useGlobalUsers } from "../../context/DataContext";
import { useEventCreator } from "../../hooks/useEventCreator";
import { useTempEntityManager } from "../../hooks/useTempEntityManager";
import { EventCreationStepper } from "./EventCreationStepper";
import { EventFormRenderer } from "./EventFormRenderer";

const steps = [
  {
    title: "Event Details",
    description: "Basic information about your event",
  },
  {
    title: "Categories",
    description: "Choose relevant categories",
  },
  {
    title: "Event Creator",
    description: "Select who created this event",
  },
];

export const CreateEventModal = ({ isOpen, onClose, onSave }) => {
  const { categories, isLoading: categoriesLoading } = useGlobalCategories();
  const { users, isLoading: usersLoading } = useGlobalUsers();

  const {
    allCategories,
    allUsers,
    handleTempCategoryCreate,
    handleTempUserCreate,
    handleSaveWithTempEntities,
    clearTempEntities,
  } = useTempEntityManager(categories, users, onSave);

  const isLoadingData = categoriesLoading || usersLoading;

  const {
    activeStep,
    eventData,
    isLoading,
    errors,
    completedSteps,
    handleInputChange,
    handleNext,
    handlePrevious,
    handleStepClick,
    handleSave,
    resetData,
  } = useEventCreator(handleSaveWithTempEntities, onClose);

  const handleClose = useCallback(() => {
    resetData();
    clearTempEntities();
    onClose();
  }, [resetData, clearTempEntities, onClose]);

  const getStepTitle = useMemo(() => {
    return steps[activeStep]?.title || "Create Event";
  }, [activeStep]);

  const isLastStep = useMemo(() => {
    return activeStep === steps.length - 1;
  }, [activeStep]);

  if (isLoadingData) {
    return (
      <Modal isOpen={isOpen} onClose={handleClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Event</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex justify="center" align="center" minH="200px">
              <VStack spacing={4}>
                <Text>Loading...</Text>
              </VStack>
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size={{ base: "full", md: "2xl" }}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader fontSize={{ base: "lg", md: "xl" }}>
          Create New Event - {getStepTitle}
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody pb={6}>
          <VStack spacing={6}>
            <Box w="100%">
              <EventCreationStepper
                activeStep={activeStep}
                steps={steps}
                onStepClick={handleStepClick}
                completedSteps={completedSteps}
              />
            </Box>

            <Box w="100%" minH="400px">
              <EventFormRenderer
                activeStep={activeStep}
                eventData={eventData}
                onFieldChange={handleInputChange}
                errors={errors}
                allCategories={allCategories}
                allUsers={allUsers}
                onTempCategoryCreate={handleTempCategoryCreate}
                onTempUserCreate={handleTempUserCreate}
              />
            </Box>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3} w="100%" justify="space-between">
            <Button
              variant="ghost"
              onClick={activeStep === 0 ? handleClose : handlePrevious}
              size={{ base: "sm", md: "md" }}
            >
              {activeStep === 0 ? "Cancel" : "Previous"}
            </Button>

            <HStack spacing={2}>
              <Text fontSize="sm" color="gray.500">
                Step {activeStep + 1} of {steps.length}
              </Text>

              {isLastStep ? (
                <Button
                  colorScheme="green"
                  onClick={handleSave}
                  isLoading={isLoading}
                  loadingText="Creating..."
                  size={{ base: "sm", md: "md" }}
                  _hover={{
                    bg: "green.600",
                  }}
                >
                  Create Event
                </Button>
              ) : (
                <Button
                  colorScheme="gray"
                  bg="gray.700"
                  color="white"
                  onClick={handleNext}
                  size={{ base: "sm", md: "md" }}
                  _hover={{
                    bg: "gray.800",
                  }}
                >
                  Next
                </Button>
              )}
            </HStack>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
