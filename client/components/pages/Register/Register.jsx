import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../Card/Card';
import Form from '../../Form/Form';
import Typography from '../../Typography/Typography';
import Button from '../../Buttons/Button/Button';
import { registerUser } from '../../../store/actions/authAction';
import validate, { objIsEmpty } from '../../../helper/validation';
import classes from './Register.css';

class Register extends Component {
   state = {
      username: {
         value: '',
         rules: {
            required: true,
         },
         errors: {},
         isValid: false,
         touched: false,
      },
      email: {
         value: '',
         rules: {
            required: true,
            validateEmail: true,
         },
         errors: {},
         isValid: false,
         touched: false,
      },
      password: {
         value: '',
         rules: {
            required: true,
            minLength: 6,
            maxLength: 255,
         },
         errors: {},
         isValid: false,
         touched: false,
      },
      formIsValid: false,
   };

   handleSubmit = async (event) => {
      event.preventDefault();
      const { handleDrawer, history, registerUser } = this.props;
      const {
         formIsValid, username, email, password,
      } = this.state;

      Object.keys(this.state).forEach((name) => {
         // 何も入力されずに登録ボタンを押された場合のチェック
         // 無理やりバリデートにかけエラーをはかす
         if (name !== 'formIsValid' && !name.touched) {
            const errors = validate(name, '', this.state[name].rules);

            this.setState(prevSate => ({
               [name]: {
                  ...prevSate[name],
                  touched: true,
                  errors,
               },
            }));
         }
      });

      // ユーザーオブジェクトの準備
      const user = Object.assign(
         {},
         {
            username: username.value,
            email: email.value,
            password: password.value,
         },
      );

      // エラーがない場合のみ登録してリダイレクト
      if (formIsValid) {
         const result = await registerUser(user);
         if (result) {
            history.push('/reader');
            handleDrawer();
         }
      }
   };

   handleInputChange = (event) => {
      this.handleValidation(event);
   };

   handleOnBlur = (event) => {
      this.handleValidation(event);
   };

   handleValidation(event) {
      const { email, username, password } = this.state;
      const { name, value } = event.target;
      const properties = { ...this.state[name] };
      const { rules } = properties;

      const errors = validate(name, value, rules);

      this.setState(prevSate => ({
         formIsValid: username.isValid && email.isValid && password.isValid,
         [name]: {
            ...prevSate[name],
            value,
            touched: true,
            isValid: objIsEmpty(errors),
            errors,
         },
      }));
   }

   render() {
      const { email, username, password } = this.state;

      return (
         <Card className={classes.register}>
            <Typography as="h1" align="center" className={classes.title}>
               会員登録
            </Typography>
            <Form onSubmit={this.handleSubmit}>
               <Form.TextField
                  onBlur={this.handleOnBlur}
                  onChange={this.handleInputChange}
                  error={username.touched && !username.isValid}
                  label="User Name"
                  messages={Object.values(username.errors)}
                  id="username"
                  touched={username.touched}
                  value={username.value}
               />
               <Form.TextField
                  onChange={this.handleInputChange}
                  onBlur={this.handleOnBlur}
                  error={email.touched && !email.isValid}
                  label="Email"
                  messages={Object.values(email.errors)}
                  id="email"
                  value={email.value}
               />
               <Form.TextField
                  onBlur={this.handleOnBlur}
                  onChange={this.handleInputChange}
                  error={password.touched && !password.isValid}
                  label="Password"
                  messages={Object.values(password.errors)}
                  id="password"
                  type="password"
                  value={password.value}
               />
               <Button className={classes.btn} fit type="submit">
                  登録
               </Button>
            </Form>
         </Card>
      );
   }
}

const actions = {
   registerUser,
};

const { func, shape } = PropTypes;

Register.propTypes = {
   handleDrawer: func.isRequired,
   history: shape({
      push: func.isRequired,
   }).isRequired,
   registerUser: func.isRequired,
};

export default connect(
   null,
   actions,
)(Register);
