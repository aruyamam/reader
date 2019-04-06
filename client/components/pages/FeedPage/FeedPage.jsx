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
      const { fetchArticles, match } = this.props;
      if (prevProps.match.params.feedId !== match.params.feedId) {
         fetchArticles(match.params.feedId);
      }
   }

   render() {
      const {
         articles, error, loading, match, readArticle,
      } = this.props;

      return (
         <Fragment>
            {loading ? (
               <div className={classes.loader}>
                  <div className={classes.loaderInner}>
                     <Loading />
                  </div>
               </div>
            ) : (
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
               </Fragment>
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
});

FeedPage.propTypes = {
   articles: PropTypes.arrayOf(PropTypes.object).isRequired,
   error: PropTypes.string.isRequired,
   fetchArticles: PropTypes.func.isRequired,
   loading: PropTypes.bool.isRequired,
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
