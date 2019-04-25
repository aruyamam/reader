import { objIsEmpty } from './util';

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

const defaultRules = {
   username: {
      required: true,
   },
   email: {
      required: true,
      validateEmail: true,
   },
   password: {
      required: true,
      minLength: 6,
      maxLength: 255,
   },
};

const validate = (nameAndValues, rules = defaultRules) => {
   const errors = {};
   let isValid = true;

   Object.keys(nameAndValues).forEach((name) => {
      // 個別のエラーオブジェクトを初期化
      errors[name] = {};

      Object.keys(rules[name]).forEach((rule) => {
         // バリデーションファンクションを実行
         isValid = funcMap[rule](nameAndValues[name], rules[name][rule]);

         // バリデーションを通らなかった場合のみエラーオブジェクトを追加
         if (!isValid) {
            errors[name][rule] = messages[rule](nameMap[name], rules[name][rule]);
         }
         else {
            // console.log(errors[name][rule]);
            delete errors[name][rule];
         }
      });

      // エラーがない場合は個別のエラーオブジェクトを削除
      if (objIsEmpty(errors[name])) {
         delete errors[name];
      }
   });

   return objIsEmpty(errors) ? null : errors;
};

export default validate;
