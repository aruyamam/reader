import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';

const Modal = ({ children, open }) => (
   <Fragment>
      {open && (
         <div className={classes.modal}>
            <div className={classes.inner}>{children}</div>
         </div>
      )}
   </Fragment>
);

Modal.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.element, PropTypes.bool])),
   ]).isRequired,
   open: PropTypes.bool.isRequired,
};

export default Modal;
