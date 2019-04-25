import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '../../ui/Typography/Typography';
import Form from '../../ui/Form/Form';
import Button from '../../ui/Buttons/Button/Button';
import { fetchFeeds, subscribeFeed } from '../../../store/actions/feedAction';
import classes from './FeedForm.css';
import Card from '../../ui/Card/Card';

const FeedForm = ({
   error, fetchFeeds, history, loading, userId, subscribeFeed,
}) => {
   const [feedUrl, setFeedUrl] = useState('');

   const handleOnChange = (event) => {
      setFeedUrl(event.target.value);
   };

   const handleOnSubmit = async (event) => {
      event.preventDefault();
      const feed = await subscribeFeed(feedUrl, userId);
      await fetchFeeds(userId);
      setFeedUrl('');
      history.push(`/reader/${feed._id}/`);
   };

   return (
      <Card className={classes.feedForm}>
         <Typography as="h1" align="center" className={classes.title}>
            URL登録
         </Typography>
         {error ? <div className={classes.error}>{error}</div> : null}
         <Form onSubmit={handleOnSubmit}>
            <Form.TextField
               id="feedUrl"
               label="Feed URL"
               value={feedUrl}
               onChange={handleOnChange}
            />
            <Button className={classes.btn} type="submit" fit loading={loading}>
               登録
            </Button>
         </Form>
      </Card>
   );
};

const mapStates = state => ({
   error: state.error.message,
   loading: state.async.loading,
});

const actions = {
   fetchFeeds,
   subscribeFeed,
};

const {
   bool, func, shape, string,
} = PropTypes;

FeedForm.propTypes = {
   error: string.isRequired,
   fetchFeeds: func.isRequired,
   history: shape({
      push: func.isRequired,
   }).isRequired,
   loading: bool.isRequired,
   subscribeFeed: func.isRequired,
   userId: string.isRequired,
};

export default connect(
   mapStates,
   actions,
)(FeedForm);
