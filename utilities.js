import { 
  differenceInSeconds, 
  differenceInMinutes, 
  differenceInHours, 
  differenceInDays, 
  differenceInWeeks, 
  differenceInMonths, 
  differenceInYears, 
  parseISO } from "date-fns";


const formatTimeDistance = (createdAt) => {
  try {
    const now = new Date();
    const secondsDifference = differenceInSeconds(now, createdAt);
    const minutesDifference = differenceInMinutes(now, createdAt);
    const hoursDifference = differenceInHours(now, createdAt);
    const daysDifference = differenceInDays(now, createdAt);
    const weeksDifference = differenceInWeeks(now, createdAt);
    const monthsDifference = differenceInMonths(now, createdAt);
    const yearsDifference = differenceInYears(now, createdAt);

    if (secondsDifference < 60) {
      return "just now";
    } else if (minutesDifference < 60) {
      const formattedMinutes = minutesDifference === 1 ? "min" : "mins";
      return `${minutesDifference} ${formattedMinutes} ago`;
    } else if (hoursDifference < 24) {
      const formattedHours = hoursDifference === 1 ? "hour" : "hours";
      return `${hoursDifference} ${formattedHours} ago`;
    } else if (daysDifference < 7) {
      const formattedDays = daysDifference === 1 ? "day" : "days";
      return `${daysDifference} ${formattedDays} ago`;
    } else if (weeksDifference < 4) {
      const formattedWeeks = weeksDifference === 1 ? "week" : "weeks";
      return `${weeksDifference} ${formattedWeeks} ago`;
    } else if (monthsDifference < 12) {
      const formattedMonths = monthsDifference === 1 ? "month" : "months";
      return `${monthsDifference} ${formattedMonths} ago`;
    } else {
      const formattedYears = yearsDifference === 1 ? "year" : "years";
      return `${yearsDifference} ${formattedYears} ago`;
    }
  } catch (error) {
    return "Invalid date";
  }
};

export { formatTimeDistance, parseISO };
