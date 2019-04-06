import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, component: Component, ...rest }) => (
   <Route
      {...rest}
      render={props =>
         (isAuthenticated ? (
            <Component {...props} />
         ) : (
            <Redirect
               to={{
                  pathname: '/login',
               }}
            />
         ))
      }
   />
);

const mapStateToProp = state => ({
   isAuthenticated: state.auth.user.isAuthenticated,
});

PrivateRoute.propTypes = {
   isAuthenticated: PropTypes.bool.isRequired,
   component: PropTypes.func.isRequired,
};

export default connect(mapStateToProp)(PrivateRoute);
