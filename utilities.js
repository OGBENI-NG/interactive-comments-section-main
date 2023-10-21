import { formatDistanceToNow, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

const formatTimeDistance = (createdAt) => {
  try {
    const distance = formatDistanceToNow(createdAt, {
      addSuffix: true,
      locale: enUS,
    });
    

    // Customize the format based on the time elapsed
    if (distance.startsWith("less than a minute")) {
      return "just now";
    }

    const [time, unit] = distance.split(" ");
    // Handle special case for 'a minute'
    if (time === "a minute") {
      return "1m";
    }


    
    // If the unit is not 'minute', display the full distance
    if (unit !== "minutes") {
      return distance;
    }
    
    return `${time} ${unit} ago`;
    // Display like '1m', '2h', '3d', etc.
  } catch (error) {
    // Handle invalid date format gracefully
    return "Invalid date";
  }
};
export {formatTimeDistance, parseISO} 