import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Typography from '../../ui/Typography/Typography';
import Form from '../../ui/Form/Form';
import Button from '../../ui/Buttons/Button/Button';
import { fetchFeeds, subscribeFeed } from '../../../store/actions/feedAction';
import { clearError } from '../../../store/actions/errorAction';
import classes from './FeedForm.css';
import Card from '../../ui/Card/Card';
import validate from '../../../helper/validation';

const FeedForm = ({
   clearError, error, fetchFeeds, history, loading, userId, subscribeFeed,
}) => {
   const [state, setState] = useState({
      feedUrl: '',
      message: '',
   });

   useEffect(
      () => () => {
         clearError();
      },
      [],
   );

   const handleOnChange = (event) => {
      const error = validate('url', event.target.value, {
         validateUrl: true,
      });
      const feedUrl = event.target.value;
      setState(prevState => ({
         ...prevState,
         feedUrl,
         message: error.validateUrl ? error.validateUrl : '',
      }));
   };

   const handleOnSubmit = async (event) => {
      event.preventDefault();

      // 値が空だった場合エラーメッセを設定
      if (state.feedUrl.trim() === '') {
         return setState(prevStae => ({
            ...prevStae,
            message: 'urlの入力が必要です',
         }));
      }

      // エラーメッセージが空の場合のみ
      // urlを登録, 入力欄を空にして
      // フィードページにリダイレクト
      if (state.message === '') {
         const feed = await subscribeFeed(state.feedUrl, userId);
         if (feed) {
            await fetchFeeds(userId);
            setState(prevState => ({
               ...prevState,
               feedUrl: '',
            }));
            history.push(`/reader/${feed._id}/`);
         }
      }
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
               value={state.feedUrl}
               onChange={handleOnChange}
               error={!!state.message}
               messages={[state.message]}
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
   clearError,
   fetchFeeds,
   subscribeFeed,
};

const {
   bool, func, shape, string,
} = PropTypes;

FeedForm.propTypes = {
   clearError: func.isRequired,
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
