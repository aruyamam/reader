import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.css';

const Card = ({ children }) => <div className={classes.Card}>{children}</div>;

Card.defaultProps = {
   children: '',
};

Card.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element),
   ]),
};

export default Card;
