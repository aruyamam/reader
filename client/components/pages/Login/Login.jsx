import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '../../Card/Card';
import Form from '../../Form/Form';
import Typography from '../../Typography/Typography';
import Button from '../../Buttons/Button/Button';
import { loginUser } from '../../../store/actions/authAction';
import classes from './Login.css';

class Register extends Component {
   state = {
      email: '',
      password: '',
   };

   handleSubmit = async (event) => {
      event.preventDefault();
      const { handleDrawer, history, loginUser } = this.props;
      const user = Object.assign({}, this.state);
      await loginUser(user);
      history.push('/reader');
      handleDrawer();
   };

   handleInputChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
   };

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
                  label="Email"
                  id="email"
                  value={email}
               />
               <Form.TextField
                  onChange={this.handleInputChange}
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
               />
               <Button className={classes.btn} fit type="submit">
                  ログイン
               </Button>
            </Form>
         </Card>
      );
   }
}

Register.propTypes = {
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
)(Register);
