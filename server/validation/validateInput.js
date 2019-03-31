const validateInput = (data) => {
   console.log(data);
   const error = {};

   if (data.name === '') {
      error.name = '名前が入力されていません';
   }

   return {
      error,
   };
};

export default validateInput;
