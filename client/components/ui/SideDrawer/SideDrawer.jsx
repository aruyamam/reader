import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../List/List';
import ClassList from '../../../helper/List';
import { compareToToday } from '../../../helper/date';
import { updateFeed } from '../../../store/actions/feedAction';
import classes from './SideDrawer.css';
import Loading from '../../pages/Loading/Loading';

const SideDrawer = ({
   currentFeed, feeds, loading, open, style, updateFeed, user, width,
}) => {
   const handleOnClick = async (feed) => {
      if (!compareToToday(feed.updated)) {
         await updateFeed(user._id, feed._id);
      }
   };

   const classList = new ClassList(classes.drawer);
   // console.log(feeds);

   if (open) {
      classList.add(classes.open);
   }
   else {
      classList.set(classes.drawer);
   }

   return (
      <div className={classList.strList} style={{ ...style, width }}>
         <div className={classes.holder}>
            <div className={classes.tab}>
               {loading ? (
                  <div className={classes.loadingOuter}>
                     <Loading size="small" />
                  </div>
               ) : (
                  <List>
                     {feeds.map(feed => (
                        <List.Item
                           onClick={() => handleOnClick(feed)}
                           as={Link}
                           active={feed._id === currentFeed}
                           key={feed._id}
                           link={`/reader/${feed._id}`}
                           tabIndex="0"
                        >
                           {/* <img src={feed.icon || `${feed.link}/favicon.ico`} alt="favicon" /> */}
                           {feed.title}
                        </List.Item>
                     ))}
                  </List>
               )}
            </div>
            {user.isAuthenticated && (
               <Link className={classes.addFeedBtn} to="/reader">
                  フイードを追加
               </Link>
            )}
         </div>
      </div>
   );
};

SideDrawer.defaultProps = {
   style: {},
};

const {
   arrayOf, bool, func, shape, object, string,
} = PropTypes;

SideDrawer.propTypes = {
   currentFeed: string.isRequired,
   feeds: arrayOf(
      shape({
         _id: string.isRequired,
         title: string.isRequired,
      }),
   ).isRequired,
   loading: bool.isRequired,
   open: bool.isRequired,
   style: object,
   updateFeed: func.isRequired,
   user: shape({
      isAuthenticated: bool.isRequired,
   }).isRequired,
   width: string.isRequired,
};

const mapStates = state => ({
   currentFeed: state.feed.currentFeed,
   // feeds: state.feed.feeds.map(feed => ({ ...feed.feed })),
   feeds: state.feed.feeds,
   loading: state.async.fetchFeeds,
});

const actions = {
   updateFeed,
};

export default withRouter(
   connect(
      mapStates,
      actions,
   )(SideDrawer),
);
