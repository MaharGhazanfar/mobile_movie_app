// method to to formate time
export function convertToTime(minutes: number): string {
    const hours: number = Math.floor(minutes / 60); // Calculate the number of hours
    const mins: number = minutes % 60; // Calculate the remaining minutes
    return `${hours}h and ${mins}m`
}

// method to fomrate int value
export function formatNumber(value: number): string {
    if (value >= 1e9) {
      return (value / 1e9).toFixed(1).replace(/\.0$/, "") + "b"; // Billions
    }
    if (value >= 1e6) {
      return (value / 1e6).toFixed(1).replace(/\.0$/, "") + "m"; // Millions
    }
    if (value >= 1e3) {
      return (value / 1e3).toFixed(1).replace(/\.0$/, "") + "k"; // Thousands
    }
    return value.toString(); // Less than 1000, return as-is
  }

  // method to formate date 
 export function formatDate(dateString: string): string {
    const date = new Date(dateString); // Convert the string into a Date object
  
    // Ensure the date is valid
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date string");
    }
  
    // Format options
    const options: Intl.DateTimeFormatOptions = { 
      month: "long", 
      day: "numeric", 
      year: "numeric" 
    };
  
    // Format the date using Intl.DateTimeFormat
     // Format the date using Intl.DateTimeFormat
  return date.toLocaleDateString("en-US", options);
}