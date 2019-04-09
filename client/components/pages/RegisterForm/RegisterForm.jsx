import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../Card/Card';
import Form from '../../Form/Form';
import Typography from '../../Typography/Typography';
import Button from '../../Buttons/Button/Button';
import { loginUser, registerUser } from '../../../store/actions/authAction';
import validate, { objIsEmpty } from '../../../helper/validation';
import classes from './RegisterForm.css';

class RegisterForm extends Component {
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
      const {
         handleDrawer, history, loginUser, register, registerUser,
      } = this.props;

      const { formIsValid } = this.state;
      const user = {};

      Object.keys(this.state).forEach((name) => {
         if (name !== 'formIsValid' && name && !name.touched) {
            const errors = validate(name, '', this.state[name].rules);

            this.setState(prevSate => ({
               [name]: {
                  ...prevSate[name],
                  touched: true,
                  errors,
               },
            }));
         }

         if (formIsValid) {
            user[name] = this.state[name].value;
         }
      });

      if (formIsValid) {
         if (register) {
            await registerUser(user);
         }
         else {
            await loginUser(user);
         }
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
      const { email, password, username } = this.state;
      const { name, value } = event.target;
      const properties = { ...this.state[name] };
      const { rules } = properties;

      const errors = validate(name, value, rules);

      this.setState(prevSate => ({
         formIsValid: email.isValid && password.isValid && (username && username.isValid),
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
      const { email, password, username } = this.state;
      const { register } = this.props;
      let { label, btnLabel } = this.props;

      if (register && !label && !btnLabel) {
         label = '登録フォーム';
         btnLabel = '登録';
      }

      return (
         <Card className={classes.container}>
            <Typography className={classes.title} as="h1" align="center">
               {label}
            </Typography>
            <Form onSubmit={this.handleSubmit}>
               {register && (
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
               )}
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
               <Button className={classes.btn} fit size="small" type="submit">
                  {btnLabel}
               </Button>
            </Form>
         </Card>
      );
   }
}

RegisterForm.defaultProps = {
   btnLabel: '',
   handleDrawer: null,
   label: '',
   loginUser: null,
   register: false,
   registerUser: null,
};

RegisterForm.propTypes = {
   btnLabel: PropTypes.string,
   handleDrawer: PropTypes.func,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   label: PropTypes.string,
   loginUser: PropTypes.func,
   register: PropTypes.bool,
   registerUser: PropTypes.func,
};

const actions = {
   loginUser,
   registerUser,
};

export default connect(
   null,
   actions,
)(RegisterForm);
