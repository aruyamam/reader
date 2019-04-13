import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../List/List';
import ClassList from '../../helper/List';
import { compareToToday } from '../../helper/date';
import { updateFeed } from '../../store/actions/feedAction';
import classes from './SideDrawer.css';

const SideDrawer = ({
   currentFeed, feeds, open, style, updateFeed, user, width,
}) => {
   const handleOnClick = async (feed) => {
      if (!compareToToday(feed.updated)) {
         console.log(feed.updated);
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

const mapStates = state => ({
   currentFeed: state.feed.currentFeed,
   feeds: state.feed.feeds.map(feed => ({ ...feed.feed })),
});

const actions = {
   updateFeed,
};

SideDrawer.propTypes = {
   currentFeed: PropTypes.string.isRequired,
   feeds: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
      }),
   ).isRequired,
   open: PropTypes.bool.isRequired,
   style: PropTypes.object,
   updateFeed: PropTypes.func.isRequired,
   user: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
   width: PropTypes.string.isRequired,
};

export default withRouter(
   connect(
      mapStates,
      actions,
   )(SideDrawer),
);
