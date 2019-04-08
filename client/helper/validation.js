const required = value => value.trim() !== '';

const minLength = (value, policy) => {
   if (value) {
      return value.length >= policy;
   }

   return true;
};

const maxLength = (value, policy) => {
   if (value) {
      return value.length <= policy;
   }

   return true;
};

const validateEmail = (value) => {
   if (value) {
      return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
         value,
      );
   }

   return true;
};

const funcMap = {
   required,
   minLength,
   maxLength,
   validateEmail,
};

const messages = {
   required: attr => `${attr}は必須です`,
   minLength: (attr, policy) => `${attr}は${policy}文字以上必須です。`,
   maxLength: (attr, policy) => `${attr}は${policy}文字以下必須です。`,
   validateEmail: () => '不正なメールアドレスです。',
};

const nameMap = {
   username: 'ユーザーネーム',
   email: 'メールドレス',
   password: 'パスワード',
};

const validate = (name, value, rules) => {
   const errors = {};
   let isValid = true;

   Object.keys(rules).forEach((rule) => {
      isValid = funcMap[rule](value, rules[rule]);
      if (!isValid) {
         errors[rule] = messages[rule](nameMap[name], rules[rule]);
      }
      else {
         delete errors[rule];
      }
   });

   return errors;
};

export const objIsEmpty = obj => Object.keys(obj).length === 0;

export default validate;
