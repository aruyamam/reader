import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Grid from './components/Grid/Grid';
import Landing from './components/Landing';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Register from './components/pages/Register/Register';
import Login from './components/pages/Login/Login';
import FeedPage from './components/pages/FeedPage/FeedPage';
import PrivateRoute from './components/hoc/PrivateRoute';
import { fetchFeeds } from './store/actions/feedAction';
import classes from './Router.css';

class Router extends Component {
   state = {
      isDrawerOpen: false,
   };

   componentDidMount() {
      const { user, fetchFeeds } = this.props;
      // console.log(user);
      if (user.isAuthenticated) {
         fetchFeeds(user._id);
         this.setState({ isDrawerOpen: true });
      }
   }

   handleDrawer = () => {
      this.setState(state => ({
         isDrawerOpen: !state.isDrawerOpen,
      }));
   };

   closeDrawer = () => this.setState({ isDrawerOpen: false });

   render() {
      const { isDrawerOpen } = this.state;
      const { user } = this.props;

      return (
         <Fragment>
            <Switch>
               <Route exact path="/" component={Landing} />
            </Switch>
            <Route
               path="/(.+)"
               render={() => (
                  <Fragment>
                     <Navbar
                        closeDrawer={this.closeDrawer}
                        handleDrawer={this.handleDrawer}
                        user={user}
                     />
                     <Grid className={classes.router} container>
                        <SideDrawer
                           className="drawer"
                           open={isDrawerOpen}
                           user={user}
                           width="268px"
                        />
                        {/* <Grid
                           classes={classes}
                           container
                           xs={1}
                           open={isDrawerOpen}
                           drawerWidth="250"
                           style={{ maxWidth: '100%', overflowX: 'hidden' }}
                        > */}
                        <Grid
                           className={classes.mainContent}
                           xs={12}
                           style={{
                              marginLeft: isDrawerOpen ? '268px' : '0',
                           }}
                        >
                           <Switch>
                              <Route exact path="/reader" component={Home} />
                              <Route path="/reader/:feedId" component={FeedPage} />
                              <Route path="/register" component={Register} />
                              <Route
                                 path="/login"
                                 render={props => (
                                    <Login handleDrawer={this.handleDrawer} {...props} />
                                 )}
                              />
                           </Switch>
                        </Grid>
                     </Grid>
                     {/* </Grid> */}
                  </Fragment>
               )}
            />
         </Fragment>
      );
   }
}

const actions = {
   fetchFeeds,
};

const mapStates = state => ({
   user: state.auth.user,
});

Router.propTypes = {
   fetchFeeds: PropTypes.func.isRequired,
   user: PropTypes.shape({
      _id: PropTypes.string,
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
};

export default withRouter(
   connect(
      mapStates,
      actions,
   )(Router),
);
