import React from 'react';
import PropTypes from 'prop-types';
import classes from './ListItem.css';

const ListItem = ({
   as, active, children, link, onClick, style,
}) => {
   const classNames = [classes.ListItem];
   const Element = as;

   if (active) {
      classNames.push(classes.active);
   }

   return (
      <li onClick={onClick} className={classNames.join(' ')} style={style}>
         <Element className={classes.link} to={link}>
            {children}
         </Element>
      </li>
   );
};

ListItem.defaultProps = {
   active: false,
   as: 'div',
   link: '',
   onClick: null,
};

const {
   arrayOf, bool, func, node, object, oneOfType, string,
} = PropTypes;

ListItem.propTypes = {
   active: bool,
   as: oneOfType([func, string]),
   children: oneOfType([arrayOf(node), node]).isRequired,
   link: string,
   onClick: func,
   style: object,
};

export default ListItem;
