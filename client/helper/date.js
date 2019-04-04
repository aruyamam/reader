export const compareToToday = (dateStr) => {
   const now = new Date();
   const comparer = new Date(dateStr);

   return (
      now.getFullYear() === comparer.getFullYear()
      && now.getMonth() === comparer.getMonth()
      && now.getDate() === comparer.getDate()
   );
};
