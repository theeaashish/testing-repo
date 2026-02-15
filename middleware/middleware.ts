// Format date using Intl with safe defaults
export const formatDate = (
  date: Date | string | number,
  options?: Intl.DateTimeFormatOptions,
) => {
  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error("Invalid date provided");
  }

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    ...options,
  }).format(parsedDate);
};
