export const dateFormatter = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });

  return formatter.format(date);
};

export const timeFormatter = (date: Date) => {
  const formatter = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return formatter.format(date);
};
