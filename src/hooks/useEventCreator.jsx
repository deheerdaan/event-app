import { useCallback, useState } from "react";
import { validateEventData } from "../utils/eventValidation";

const initialEventData = {
  title: "",
  description: "",
  image: "",
  location: "",
  startTime: "",
  endTime: "",
  categoryIds: [],
  createdBy: "",
};

export const useEventCreator = (onSave, onClose) => {
  const [activeStep, setActiveStep] = useState(0);
  const [eventData, setEventData] = useState(initialEventData);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [completedSteps, setCompletedSteps] = useState(new Set());

  const handleInputChange = useCallback(
    (field, value) => {
      setEventData((prev) => ({ ...prev, [field]: value }));

      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const validateCurrentStep = useCallback(() => {
    const result = validateEventData(eventData, activeStep + 1);
    setErrors(result.errors);
    return result.isValid;
  }, [eventData, activeStep]);

  const handleNext = useCallback(() => {
    if (validateCurrentStep()) {
      setCompletedSteps((prev) => new Set([...prev, activeStep]));
      setActiveStep((prev) => Math.min(prev + 1, 2));
    }
  }, [validateCurrentStep, activeStep]);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
    setErrors({});
  }, []);

  const handleStepClick = useCallback(
    (stepIndex) => {
      if (stepIndex <= activeStep) {
        setActiveStep(stepIndex);
        setErrors({});
      }
    },
    [activeStep]
  );

  const resetData = useCallback(() => {
    setActiveStep(0);
    setEventData(initialEventData);
    setErrors({});
    setCompletedSteps(new Set());
  }, []);

  const handleSave = useCallback(async () => {
    const result = validateEventData(eventData);
    if (!result.isValid) {
      setErrors(result.errors);
      if (
        result.errors.title ||
        result.errors.description ||
        result.errors.image ||
        result.errors.startTime ||
        result.errors.endTime
      ) {
        setActiveStep(0);
      } else if (result.errors.categoryIds) {
        setActiveStep(1);
      } else if (result.errors.createdBy) {
        setActiveStep(2);
      }
      return;
    }

    setIsLoading(true);
    try {
      const eventDataToSave = {
        title: eventData.title,
        description: eventData.description,
        image: eventData.image,
        location: eventData.location,
        startTime: new Date(eventData.startTime).toISOString(),
        endTime: new Date(eventData.endTime).toISOString(),
        categoryIds: eventData.categoryIds.map((id) => parseInt(id, 10)),
        createdBy:
          typeof eventData.createdBy === "number"
            ? eventData.createdBy
            : parseInt(eventData.createdBy, 10),
      };

      await onSave(eventDataToSave);
      resetData();
      onClose();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [eventData, onSave, onClose, resetData]);

  return {
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
  };
};
