import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../Card/Card';
import Form from '../../Form/Form';
import Typography from '../../Typography/Typography';
import Button from '../../Buttons/Button/Button';
import { loginUser } from '../../../store/actions/authAction';
import validate, { objIsEmpty } from '../../../helper/validation';
import classes from './Login.css';

class Login extends Component {
   state = {
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
      const { handleDrawer, history, loginUser } = this.props;

      const { formIsValid, email, password } = this.state;

      Object.keys(this.state).forEach((name) => {
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

      const user = Object.assign(
         {},
         {
            email: email.value,
            password: password.value,
         },
      );

      if (formIsValid) {
         await loginUser(user);
         history.push('/reader');
         handleDrawer();
      }
   };

   handleInputChange = (event) => {
      this.handleValidation(event);
   };

   handleOnBlur = (event) => {
      this.handleValidation(event);
   };

   handleValidation(event) {
      const { email, password } = this.state;
      const { name, value } = event.target;
      const properties = { ...this.state[name] };
      const { rules } = properties;

      const errors = validate(name, value, rules);

      this.setState(prevSate => ({
         formIsValid: email.isValid && password.isValid,
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
      const { email, password } = this.state;

      return (
         <Card className={classes.login}>
            <Typography className={classes.title} as="h1" align="center">
               ログイン
            </Typography>
            <Form onSubmit={this.handleSubmit}>
               <Form.TextField
                  onChange={this.handleInputChange}
                  onBlur={this.handleOnBlur}
                  error={email.touched && !email.isValid}
                  id="email"
                  label="Email"
                  messages={Object.values(email.errors)}
                  value={email.value}
               />
               <Form.TextField
                  onChange={this.handleInputChange}
                  onBlur={this.handleOnBlur}
                  error={password.touched && !password.isValid}
                  id="password"
                  label="Password"
                  messages={Object.values(password.errors)}
                  type="password"
                  value={password.value}
               />
               <Button className={classes.btn} fit type="submit">
                  ログイン
               </Button>
            </Form>
         </Card>
      );
   }
}

Login.propTypes = {
   handleDrawer: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   loginUser: PropTypes.func.isRequired,
};

const actions = {
   loginUser,
};

export default connect(
   null,
   actions,
)(Login);
