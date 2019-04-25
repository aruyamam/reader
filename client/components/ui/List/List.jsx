import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './List.css';
import ListItem from '../ListItem/ListItem';

class List extends Component {
   static Item = ListItem;

   render() {
      const { children, role } = this.props;

      return (
         <ul className={classes.list} role={role}>
            {children}
         </ul>
      );
   }
}

List.defaultProps = {
   role: '',
};

const {
   arrayOf, element, oneOfType, string,
} = PropTypes;

List.propTypes = {
   children: oneOfType([arrayOf(string), arrayOf(element), string]).isRequired,
   role: string,
};

export default List;
