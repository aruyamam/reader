const isEmpty = (value) => {
   if (Array.isArray(value)) {
      return value.length === 0;
   }
};

export default isEmpty;
