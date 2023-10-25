import { 
  differenceInSeconds, 
  differenceInMinutes, 
  differenceInHours, 
  differenceInDays, 
  differenceInWeeks, 
  differenceInMonths, 
  differenceInYears, 
  parseISO } from "date-fns";


const formatUnit = (value, singularUnit, pluralUnit) =>
  `${value} ${value === 1 ? singularUnit : pluralUnit}`;

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
      return formatUnit(minutesDifference, "min", "mins") + " ago";
    } else if (hoursDifference < 24) {
      return formatUnit(hoursDifference, "hour", "hours") + " ago";
    } else if (daysDifference < 7) {
      return formatUnit(daysDifference, "day", "days") + " ago";
    } else if (weeksDifference < 4) {
      return formatUnit(weeksDifference, "week", "weeks") + " ago";
    } else if (monthsDifference < 12) {
      return formatUnit(monthsDifference, "month", "months") + " ago";
    } else {
      return formatUnit(yearsDifference, "year", "years") + " ago";
    }
  } catch (error) {
    return "Invalid date";
  }
};

export { formatTimeDistance, parseISO };

