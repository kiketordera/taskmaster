export function useDateFormatter() {
    const formattedDate = (dateStr: string): string => {
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return "Invalid date";
      }
      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };
  
    return {
      formattedDate,
    };
  }