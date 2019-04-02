import React from 'react';
import PropTypes from 'prop-types';
import classes from './Card.css';
import List from '../../helper/List';

const Card = ({ children, className }) => {
   const classList = new List(classes.card);

   if (className) {
      classList.add(className);
   }

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
