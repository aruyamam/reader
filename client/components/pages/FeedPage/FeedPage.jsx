import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles, readArticle } from '../../../store/actions/feedAction';
import FeedContent from './FeedContent/FeedContent';
import Loading from '../Loading/Loading';
import classes from './FeedPage.css';

class FeedPage extends Component {
   componentDidMount() {
      const { fetchArticles, match } = this.props;
      fetchArticles(match.params.feedId);
   }

   componentDidUpdate(prevProps) {
      const { fetchArticles, match, mainPageRef } = this.props;
      if (prevProps.match.params.feedId !== match.params.feedId) {
         fetchArticles(match.params.feedId);
         mainPageRef.current.scrollTo(0, 0);
      }
   }

   render() {
      const {
         articles, error, loading, match, readArticle,
      } = this.props;
      // console.log(articles);

      return (
         <Fragment>
            {error ? (
               <div className={classes.error}>{error}</div>
            ) : (
               articles.map((article, i) => (
                  <FeedContent
                     key={article._id}
                     article={article}
                     match={match}
                     readArticle={readArticle}
                     tabIndex={i}
                  />
               ))
            )}
            {loading && (
               <div className={classes.loader}>
                  <div className={classes.loaderInner}>
                     <Loading />
                  </div>
               </div>
            )}
         </Fragment>
      );
   }
}

const actions = {
   fetchArticles,
   readArticle,
};

const mapStates = state => ({
   articles: state.feed.articles,
   error: state.error.message,
   loading: state.async.loading,
   count: state.feed.count,
});

FeedPage.propTypes = {
   articles: PropTypes.arrayOf(PropTypes.object).isRequired,
   error: PropTypes.string.isRequired,
   fetchArticles: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
   mainPageRef: PropTypes.shape({
      current: PropTypes.object,
   }).isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         feedId: PropTypes.string,
      }),
   }).isRequired,
   readArticle: PropTypes.func.isRequired,
};

export default connect(
   mapStates,
   actions,
)(FeedPage);
