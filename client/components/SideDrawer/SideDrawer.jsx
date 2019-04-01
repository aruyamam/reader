import React from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import List from '../List/List';
import ClassList from '../../helper/List';
import classes from './SideDrawer.css';

const SideDrawer = ({
   currentFeed, feeds, open, style, user, width,
}) => {
   const classList = new ClassList(classes.drawer);

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
                        active={feed._id === currentFeed}
                        key={feed._id}
                        link={`/reader/${feed._id}`}
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

SideDrawer.propTypes = {
   currentFeed: PropTypes.string.isRequired,
   feeds: PropTypes.arrayOf(
      PropTypes.shape({
         _id: PropTypes.string.isRequired,
         title: PropTypes.string.isRequired,
      }),
   ).isRequired,
   open: PropTypes.bool.isRequired,
   user: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
   width: PropTypes.string.isRequired,
};

export default withRouter(connect(mapStates)(SideDrawer));
