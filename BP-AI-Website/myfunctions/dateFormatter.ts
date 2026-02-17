export const dateFormatter = (
  date: Date,
  options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  }
): string => {
  const formatter = new Intl.DateTimeFormat("en-US", options);
  const formattedDate = formatter.format(date);
  return formattedDate;
};
