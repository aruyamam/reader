import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Grid from './components/ui/Grid/Grid';
import Landing from './components/pages/Landing/Landing';
import SideDrawer from './components/ui/SideDrawer/SideDrawer';
import Navbar from './components/ui/Navbar/Navbar';
import Home from './components/pages/Home';
import Login from './components/pages/Login/Login';
import Register from './components/pages/Register/Register';
import FeedPage from './components/pages/FeedPage/FeedPage';
import NotFound from './components/pages/NotFound/NotFound'
import Modal from './components/ui/Modal/Modal';
import { fetchArticles, fetchFeeds, updateArticles } from './store/actions/feedAction';
import classes from './Router.css';

class Router extends Component {
   constructor(props) {
      super(props);

      this.state = {
         isDrawerOpen: false,
         width: window.innerWidth,
      };

      this.mainPageRef = React.createRef();
   }

   componentDidMount() {
      window.addEventListener('resize', this.handleResize);
      const { user, fetchFeeds } = this.props;

      // ユーザーがログインしていたら
      if (user.isAuthenticated) {
         fetchFeeds(user._id);

         // 最初の表示もしくは前回SideDrawerを開いていたら
         // SideDrawerを開く
         if (
            !localStorage.getItem('isDrawerOpen')
            || localStorage.getItem('isDrawerOpen') === 'true'
         ) {
            this.setState({ isDrawerOpen: true });
         }
      }
   }

   componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize);
   }

   handleResize = () => {
      this.setState({ width: window.innerWidth });
   };

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
      this.setState((state) => {
         localStorage.setItem('isDrawerOpen', `${!state.isDrawerOpen}`);

         return { isDrawerOpen: !state.isDrawerOpen };
      });
   };

   closeDrawer = () => {
      const { isDrawerOpen } = this.state;
      localStorage.setItem('isDrawerOpen', `${isDrawerOpen}`);
      this.setState({ isDrawerOpen: false });
   };

   render() {
      const { isDrawerOpen, width } = this.state;
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
                        <Grid
                           ref={this.mainPageRef}
                           className={classes.mainContent}
                           xs={12}
                           style={{
                              marginLeft: width > 800 && isDrawerOpen ? '268px' : '0',
                           }}
                           onScroll={this.handleOnScroll}
                        >
                           <Modal
                              onClose={this.handleDrawer}
                              open={width <= 800 && isDrawerOpen}
                              zIndex={5}
                           />
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
                                    <Register handleDrawer={this.handleDrawer} {...props} />
                                 )}
                              />
                              <Route
                                 path="/login"
                                 render={props => (
                                    <Login handleDrawer={this.handleDrawer} {...props} />
                                 )}
                              />
                              <Route path="/404" component={NotFound} />
                              <Route component={NotFound} />
                           </Switch>
                        </Grid>
                     </Grid>
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
