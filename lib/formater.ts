import formatDuration from "format-duration";

export const formatTime = (timeInSecond = 0) => {
  return formatDuration(timeInSecond * 1000);
};

export const formateDate = (date: Date) => {
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
