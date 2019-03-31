import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchArticles, readArticle } from '../../../store/actions/feedAction';
import FeedContent from './FeedContent/FeedContent';

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
      const { articles, match, readArticle } = this.props;

      return (
         <Fragment>
            {articles.map((article, i) => (
               <FeedContent
                  key={article._id}
                  article={article}
                  match={match}
                  readArticle={readArticle}
                  tabIndex={i}
               />
            ))}
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
});

FeedPage.propTypes = {
   articles: PropTypes.arrayOf(PropTypes.object).isRequired,
   fetchArticles: PropTypes.func.isRequired,
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
