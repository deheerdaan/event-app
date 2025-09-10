import { SimpleGrid, Textarea, VStack } from "@chakra-ui/react";
import { FormField } from "../../ui/FormField";

export const EventDetailsStep = ({ eventData, onFieldChange, errors = {} }) => {
  return (
    <VStack spacing={{ base: 4, md: 5 }} align="stretch">
      <FormField
        label="Event Title"
        field="title"
        value={eventData.title}
        onChange={onFieldChange}
        error={errors.title}
        isRequired
        placeholder="Enter event title"
      />

      <FormField
        label="Description"
        field="description"
        value={eventData.description}
        onChange={onFieldChange}
        error={errors.description}
        isRequired
        placeholder="Describe your event..."
        as={Textarea}
        rows={{ base: 4, md: 5 }}
        resize="vertical"
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
        error={errors.location}
        placeholder="Event location"
      />

      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 4, md: 5 }}
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
    </VStack>
  );
};
