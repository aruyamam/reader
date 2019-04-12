import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.css';
import List from '../../helper/List';

const sizes = {
   small: 'small',
   medium: 'medium',
   big: 'big',
   bleed: 'bleed',
};

const Card = ({ children, className, size }) => {
   const classList = new List(classes.card);
   let cardSize = size;

   if (!Object.keys(sizes).includes(size)) {
      cardSize = sizes.medium;
   }

   if (className) {
      classList.add(className);
   }

   classList.add(classes[cardSize]);

   return <div className={classList.strList}>{children}</div>;
};

Card.defaultProps = {
   children: '',
   className: '',
};

Card.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])),
   ]),
   className: PropTypes.string,
};

export default Card;
