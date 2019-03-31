import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import classes from './ListItem.css';

const ListItem = ({
   active, children, keys, link, onClick, style,
}) => {
   const classNames = [classes.ListItem];

   if (active) {
      classNames.push(classes.active);
   }

   return (
      <li onClick={onClick} className={classNames.join(' ')} key={keys} style={style}>
         <Link className={classes.link} to={link}>
            {children}
         </Link>
      </li>
   );
};

ListItem.propTypes = {
   active: PropTypes.bool,
};

export default ListItem;
