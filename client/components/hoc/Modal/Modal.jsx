import React, { Fragment } from 'react';
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

export default Modal;
