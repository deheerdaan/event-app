import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { DateTimePicker } from "./DateTimePicker";

export const FormField = ({
  label,
  field,
  value,
  onChange,
  error,
  isRequired = false,
  type = "text",
  placeholder,
  as: Component = Input,
  rows,
  ...otherProps
}) => {
  const handleChange = (newValue) => {
    if (type === "datetime-local") {
      onChange(field, newValue);
    } else {
      onChange(field, newValue.target ? newValue.target.value : newValue);
    }
  };

  const InputComponent = type === "datetime-local" ? DateTimePicker : Component;

  const inputProps =
    type === "datetime-local"
      ? {
          value,
          onChange: handleChange,
          placeholder,
          ...otherProps,
        }
      : {
          type,
          value,
          onChange: handleChange,
          placeholder,
          rows,
          fontSize: { base: "sm", md: "md" },
          ...otherProps,
        };

  return (
    <FormControl isRequired={isRequired} isInvalid={!!error}>
      <FormLabel fontSize={{ base: "sm", md: "md" }}>{label}</FormLabel>
      <InputComponent {...inputProps} />
      <FormErrorMessage fontSize={{ base: "xs", md: "sm" }}>
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};
