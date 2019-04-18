import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Grid from './components/Grid/Grid';
import Landing from './components/Landing';
import SideDrawer from './components/SideDrawer/SideDrawer';
import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import RegisterForm from './components/pages/RegisterForm/RegisterForm';
import FeedPage from './components/pages/FeedPage/FeedPage';
import PrivateRoute from './components/hoc/PrivateRoute';
import { fetchArticles, fetchFeeds, updateArticles } from './store/actions/feedAction';
import classes from './Router.css';

class Router extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isDrawerOpen: false,
      };

      this.mainPageRef = React.createRef();
   }

   componentDidMount() {
      const { user, fetchFeeds } = this.props;
      if (user.isAuthenticated) {
         fetchFeeds(user._id);
         this.setState({ isDrawerOpen: true });
      }
   }

   handleOnScroll = (e) => {
      const { feed, loading, updateArticles } = this.props;

      if (this.handleScrollBottom(e) && feed.length < feed.max && !loading) {
         updateArticles(feed.currentFeed);
      }
   };

   handleScrollBottom = (e) => {
      const tolerance = 3;
      const { childNodes, clientHeight, scrollTop } = e.target;
      const offsetTop = childNodes[childNodes.length - 1].offsetTop - clientHeight;

      if (offsetTop >= Math.round(scrollTop) && offsetTop - tolerance <= Math.round(scrollTop)) {
         return true;
      }

      return false;
   };

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
                           ref={this.mainPageRef}
                           className={classes.mainContent}
                           xs={12}
                           style={{
                              marginLeft: isDrawerOpen ? '268px' : '0',
                           }}
                           onScroll={this.handleOnScroll}
                        >
                           <Switch>
                              <Route exact path="/reader" component={Home} />
                              <Route
                                 path="/reader/:feedId"
                                 render={props => (
                                    <FeedPage
                                       mainPageRef={this.mainPageRef}
                                       handleOnScroll={this.handleOnScroll}
                                       {...props}
                                    />
                                 )}
                              />
                              <Route
                                 path="/register"
                                 render={props => (
                                    <RegisterForm
                                       handleDrawer={this.handleDrawer}
                                       register
                                       {...props}
                                    />
                                 )}
                              />
                              <Route
                                 path="/login"
                                 render={props => (
                                    <RegisterForm
                                       handleDrawer={this.handleDrawer}
                                       label="ログイン"
                                       btnLabel="ログイン"
                                       {...props}
                                    />
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
   fetchArticles,
   updateArticles,
};

const mapStates = state => ({
   user: state.auth.user,
   feed: {
      currentFeed: state.feed.currentFeed,
      count: state.feed.count,
      max: state.feed.max,
      length: state.feed.articles.length,
   },
   loading: state.async.loading,
});

const {
   bool, func, shape, string,
} = PropTypes;

Router.propTypes = {
   feed: shape({}).isRequired,
   fetchFeeds: func.isRequired,
   loading: bool.isRequired,
   updateArticles: func.isRequired,
   user: shape({
      _id: string,
      isAuthenticated: bool.isRequired,
   }).isRequired,
};

export default withRouter(
   connect(
      mapStates,
      actions,
   )(Router),
);
