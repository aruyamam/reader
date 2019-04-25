import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../../../ui/Card/Card';
import Typography from '../../../ui/Typography/Typography';
import classes from './FeedContent.css';

let style = {};

const FeedContent = ({
   article, match, readArticle, tabIndex,
}) => {
   const [visibility, setVisibility] = useState(false);

   const handleOnClick = () => {
      if (visibility) {
         style = {
            ...style,
            transform: 'rotate(45deg)',
         };
      }
      else {
         style = {
            ...style,
            transform: 'rotate(585deg)',
         };
      }

      setVisibility(prevState => !prevState);
      readArticle(match.params.feedId, article);
   };

   return (
      <Card className={classes.feedPage}>
         <div
            onClick={handleOnClick}
            onKeyUp={handleOnClick}
            className={classes.header}
            role="button"
            tabIndex={tabIndex}
         >
            <div className={classes.headerLeft}>
               <Typography
                  className={classes.title}
                  as="h2"
                  style={{ opacity: article.isRead ? '.5' : '1' }}
               >
                  {article.title}
               </Typography>
               {article.contentSnippet && (
                  <p className={classes.excerpt}>{article.contentSnippet.substr(0, 150)}</p>
               )}
               <p className={classes.date}>
                  {new Date(article.pubDate).toLocaleDateString('ja-JP', {
                     year: 'numeric',
                     month: 'numeric',
                     day: 'numeric',
                  })}
               </p>
            </div>
            <div className={classes.headerRight}>
               <span className={classes.mark} style={style} />
            </div>
         </div>

         {visibility && (
            <div className={classes.body}>
               <a href={article.link} target="_blank" rel="noopener noreferrer">
                  {article.title}
               </a>
               <div
                  className={classes.feedContent}
                  dangerouslySetInnerHTML={{ __html: article.content }}
               />
            </div>
         )}
      </Card>
   );
};

FeedContent.propTypes = {
   article: PropTypes.shape({
      conttent: PropTypes.string,
      isRead: PropTypes.bool.isRequired,
      link: PropTypes.string.isRequired,
      pubDate: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
   }).isRequired,
   match: PropTypes.shape({
      params: PropTypes.shape({
         feedId: PropTypes.string.isRequired,
      }).isRequired,
   }).isRequired,
   readArticle: PropTypes.func.isRequired,
   tabIndex: PropTypes.number.isRequired,
};

export default FeedContent;
