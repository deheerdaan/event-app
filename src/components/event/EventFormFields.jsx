import { SimpleGrid, Textarea, VStack } from "@chakra-ui/react";
import { FormField } from "../ui/FormField";
import { CategorySelectionStep } from "./steps/CategorySelectionStep";

export const EventFormFields = ({
  eventData,
  onFieldChange,
  categories,
  onCategoriesUpdate,
  errors = {},
}) => {
  return (
    <VStack spacing={{ base: 3, md: 4 }}>
      <FormField
        label="Title"
        field="title"
        value={eventData.title}
        onChange={onFieldChange}
        error={errors.title}
        isRequired
        placeholder="Event title"
      />

      <FormField
        label="Description"
        field="description"
        value={eventData.description}
        onChange={onFieldChange}
        error={errors.description}
        isRequired
        placeholder="Event description"
        as={Textarea}
        rows={{ base: 3, md: 4 }}
      />

      <FormField
        label="Image URL"
        field="image"
        value={eventData.image}
        onChange={onFieldChange}
        error={errors.image}
        isRequired
        placeholder="https://example.com/image.jpg"
      />

      <FormField
        label="Location"
        field="location"
        value={eventData.location}
        onChange={onFieldChange}
        placeholder="Event location"
      />

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 3, md: 4 }}
        width="100%"
      >
        <FormField
          label="Start Date & Time"
          field="startTime"
          type="datetime-local"
          value={eventData.startTime}
          onChange={onFieldChange}
          error={errors.startTime}
          isRequired
        />

        <FormField
          label="End Date & Time"
          field="endTime"
          type="datetime-local"
          value={eventData.endTime}
          onChange={onFieldChange}
          error={errors.endTime}
          isRequired
        />
      </SimpleGrid>

      <CategorySelectionStep
        eventData={eventData}
        onFieldChange={onFieldChange}
        categories={categories}
        onCategoriesUpdate={onCategoriesUpdate}
        errors={errors}
      />
    </VStack>
  );
};
