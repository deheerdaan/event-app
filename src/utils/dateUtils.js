export const formatEventDate = (eventDate) => {
  if (!eventDate) {
    return "No date provided";
  }

  const date = new Date(eventDate);

  if (isNaN(date.getTime())) {
    return "Invalid date format";
  }

  return new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
    dateStyle: "short",
  }).format(date);
};
