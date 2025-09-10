import { Box, Input } from "@chakra-ui/react";
import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomInput = React.forwardRef(
  ({ value, onClick, placeholder, ...props }, ref) => (
    <Input
      ref={ref}
      value={value}
      onClick={onClick}
      placeholder={placeholder}
      readOnly
      cursor="pointer"
      fontSize={{ base: "sm", md: "md" }}
      borderColor="gray.300"
      _hover={{
        borderColor: "gray.400",
      }}
      _focus={{
        borderColor: "gray.600",
        boxShadow: "0 0 0 1px gray.600",
      }}
      {...props}
    />
  )
);
CustomInput.displayName = "CustomInput";

export const DateTimePicker = ({
  value,
  onChange,
  placeholder = "Select date and time",
  ...props
}) => {
  const dateValue = value ? new Date(value) : null;

  const handleChange = (date) => {
    if (date) {
      const isoString = date.toISOString();
      const localDateTime = isoString.slice(0, 16);
      onChange(localDateTime);
    } else {
      onChange("");
    }
  };

  return (
    <Box
      sx={{
        ".react-datepicker__day--selected": {
          backgroundColor: "#4B5563 !important",
          color: "white !important",
        },
        ".react-datepicker__day--keyboard-selected": {
          backgroundColor: "#6B7280 !important",
          color: "white !important",
        },
        ".react-datepicker__time-list-item--selected": {
          backgroundColor: "#4B5563 !important",
          color: "white !important",
        },
      }}
    >
      <DatePicker
        selected={dateValue}
        onChange={handleChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
        customInput={<CustomInput placeholder={placeholder} />}
        preventOpenOnFocus={false}
        shouldCloseOnSelect={true}
        enableTabLoop={false}
        withPortal={false}
        popperProps={{
          strategy: "fixed",
        }}
        {...props}
      />
    </Box>
  );
};
