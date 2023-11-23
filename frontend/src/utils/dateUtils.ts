export const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }
  
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };
  
    const formattedDate: string = date.toLocaleDateString('en-US', options);
  
    // Add 'th', 'st', 'nd', 'rd' to the day
    const day: string = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(date);
    const dayWithSuffix: string = addDateSuffix(day);
  
    return formattedDate.replace(/(\d+)([a-z]+)/i, (_, number, suffix) => `${number}${suffix}`);
  };
  
  const addDateSuffix = (day: string): string => {
    const numericDay: number = parseInt(day, 10);
  
    if (numericDay >= 11 && numericDay <= 13) {
      return `${day}th`;
    }
  
    switch (numericDay % 10) {
      case 1:
        return `${day}st`;
      case 2:
        return `${day}nd`;
      case 3:
        return `${day}rd`;
      default:
        return `${day}th`;
    }
  };