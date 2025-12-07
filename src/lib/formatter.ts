export const dateFormatter = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatter.format(date);
};
