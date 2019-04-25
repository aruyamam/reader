import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from './TextField/TextField.1';

class Form extends Component {
   static TextField = TextField;

   render() {
      const { children, onSubmit } = this.props;

      return <form onSubmit={onSubmit}>{children}</form>;
   }
}

Form.defaultProps = {
   onSubmit: null,
};

Form.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])),
      PropTypes.element,
   ]).isRequired,
   onSubmit: PropTypes.func,
};

export default Form;
