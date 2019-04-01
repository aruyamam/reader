import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import Grid from '../Grid/Grid';
import AppbarBtn from '../Buttons/LoginBtn/AppbarBtn';
import ToggleButton from '../ToggleBtn/ToggleButton';
import Typography from '../Typography/Typography';
import classes from './Navbar.css';
import { logoutUser } from '../../store/actions/authAction';

const Navbar = ({
   closeDrawer, handleDrawer, history, logoutUser, user,
}) => {
   const handleLogout = () => {
      logoutUser(history);
      closeDrawer();
      history.push('/login');
   };

   return (
      <Grid classes={classes.Navbar} container style={{ alignItems: 'center' }}>
         <Grid container style={{ alignItems: 'center' }}>
            {user.isAuthenticated && (
               <ToggleButton type="button" handler={handleDrawer} label="btn" />
            )}
            <Typography className={classes.title} as="h1">
               <Link to="/reader"> Reader</Link>
            </Typography>
         </Grid>
         <div>
            {user.isAuthenticated ? (
               <AppbarBtn onClick={handleLogout} className={classes.logout}>
                  ログアウト
               </AppbarBtn>
            ) : (
               <Fragment>
                  <Link to="/login" className={classes.link}>
                     ログイン
                  </Link>
                  <Link to="/register" className={classes.link}>
                     登録
                  </Link>
               </Fragment>
            )}
         </div>
      </Grid>
   );
};

const actions = {
   logoutUser,
};

Navbar.propTypes = {
   closeDrawer: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   handleDrawer: PropTypes.func.isRequired,
   logoutUser: PropTypes.func.isRequired,
   user: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
};

export default withRouter(
   connect(
      null,
      actions,
   )(Navbar),
);
