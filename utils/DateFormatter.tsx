export const formatDate = (dateStr: any) => {
    // Convert the input string to a Date object
    const date = new Date(dateStr);
    
    // Define the options for formatting the date
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
  
    // Format the date to the desired format
    return new Intl.DateTimeFormat('en-US', options).format(date);
}
  