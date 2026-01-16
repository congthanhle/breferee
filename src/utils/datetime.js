export const isNowAfterDate = (date) => {
  const targetDate = new Date(date).getTime();
  const now = new Date().getTime();
  return now > targetDate;
};

export const isNowBetweenDates = (startDate, endDate) => {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  return now >= start && now <= end;
};
