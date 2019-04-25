export default (open, width) => {
   let style = {
      width,
   };

   if (!open) {
      style = {
         ...style,
         left: '-250px',
      };
   }

   return style;
};
