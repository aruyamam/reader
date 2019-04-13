import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import classes from './ListItem.css';

const ListItem = forwardRef(
   (
      {
         as,
         active,
         children,
         link,
         onBlur,
         onClick,
         onFocus,
         onKeyUp,
         onKeyDown,
         role,
         style,
         tabIndex,
      },
      ref,
   ) => {
      const classNames = [classes.ListItem];
      const Element = as;

      if (active) {
         classNames.push(classes.active);
      }

      return (
         <li
            onBlur={onBlur}
            onClick={onClick}
            onFocus={onFocus}
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            className={classNames.join(' ')}
            style={style}
            ref={ref}
            role={role}
            tabIndex={tabIndex}
         >
            <Element tabIndex="-1" className={classes.link} to={link}>
               {children}
            </Element>
         </li>
      );
   },
);

ListItem.defaultProps = {
   active: false,
   as: 'div',
   link: '',
   onBlur: null,
   onClick: null,
   onFocus: null,
   onKeyDown: null,
   onKeyUp: null,
   role: '',
   tabIndex: '',
};

const {
   arrayOf, bool, func, node, object, oneOfType, string,
} = PropTypes;

ListItem.propTypes = {
   active: bool,
   as: oneOfType([func, string]),
   children: oneOfType([arrayOf(node), node]).isRequired,
   link: string,
   onBlur: func,
   onClick: func,
   onFocus: func,
   onKeyUp: func,
   onKeyDown: func,
   role: string,
   style: object,
   tabIndex: string,
};

export default ListItem;
