const formatDate = (isoDateString: Date): string => {
    const date = new Date(isoDateString);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // months are zero-based
    const year = date.getUTCFullYear();
  
    // Pad single-digit day and month with leading zero
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  };

  export default formatDate;