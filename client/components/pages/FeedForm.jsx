import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '../Typography/Typography';
import Form from '../Form/Form';
import Button from '../Buttons/Button/Button';
import { fetchFeeds, subscribeFeed } from '../../store/actions/feedAction';

const FeedForm = ({
   fetchFeeds, history, userId, subscribeFeed,
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
      history.push(`/reader/${feed._id}`);
   };

   return (
      <Fragment>
         <Typography as="h1" align="center">
            URL登録
         </Typography>
         <Form onSubmit={handleOnSubmit}>
            <Form.TextField
               id="feedUrl"
               label="Feed URL"
               value={feedUrl}
               onChange={handleOnChange}
            />
            <Button type="submit" fit>
               登録
            </Button>
         </Form>
      </Fragment>
   );
};

const mapDispatchToProps = {
   fetchFeeds,
   subscribeFeed,
};

FeedForm.propTypes = {
   fetchFeeds: PropTypes.func.isRequired,
   history: PropTypes.shape({
      push: PropTypes.func.isRequired,
   }).isRequired,
   subscribeFeed: PropTypes.func.isRequired,
   userId: PropTypes.string.isRequired,
};

export default connect(
   null,
   mapDispatchToProps,
)(FeedForm);
