export const formatEventDate = (eventDate) => {
  const date = new Date(eventDate);
  return new Intl.DateTimeFormat("en-GB", {
    timeStyle: "short",
    dateStyle: "short"
  }).format(date);
};
