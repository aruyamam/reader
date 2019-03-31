import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classes from './List.css';
import ListItem from '../ListItem/ListItem';

class List extends Component {
   static Item = ListItem;

   render() {
      const { children } = this.props;

      return <ul className={classes.list}>{children}</ul>;
   }
}

List.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.string,
   ]).isRequired,
};

export default List;
