import React from 'react';
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

export default connect(mapStateToProp)(PrivateRoute);
