import { format, isValid, parseISO } from "date-fns";

export const formatDate = (dateString, dateFormat = "dd-MM-yyyy") => {
  const date = new Date(dateString);
  if (!isValid(date)) {
    return "-- --";
  }
  return format(date, dateFormat);
};

export const formatTime = (dateString, timeFormat = "h:mm a") => {
  const date = new Date(dateString);
  return format(date, timeFormat);
};

export const calculateDueInDays = (dueDateString) => {
  const dueDate = new Date(dueDateString);
  const currentDate = new Date();

  const differenceInTime = dueDate.getTime() - currentDate.getTime();
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

  return `Due in ${differenceInDays} days`;
};
