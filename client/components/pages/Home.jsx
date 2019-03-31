import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from '../Card/Card';
import FeedForm from './FeedForm';
import { fetchFeeds, setCurrentFeed } from '../../store/actions/feedAction';

class Home extends Component {
   componentDidMount() {
      const { fetchFeeds, setCurrentFeed, user } = this.props;

      if (user.isAuthenticated) {
         fetchFeeds(user._id);
         setCurrentFeed('');
      }
   }

   render() {
      const { history, user } = this.props;

      if (!user.isAuthenticated) {
         return <Redirect to="/login" />;
      }

      return (
         <Fragment>
            {user.isAuthenticated ? (
               <Card>
                  <FeedForm history={history} userId={user._id} />
               </Card>
            ) : (
               <Card>Home</Card>
            )}
         </Fragment>
      );
   }
}

const mapStates = state => ({
   user: state.auth.user,
});

const actions = {
   fetchFeeds,
   setCurrentFeed,
};

Home.propTypes = {
   fetchFeeds: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   setCurrentFeed: PropTypes.func.isRequired,
   user: PropTypes.shape({
      _id: PropTypes.string,
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
};

export default connect(
   mapStates,
   actions,
)(Home);
