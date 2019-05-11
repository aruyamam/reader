import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import List from '../../../helper/List';

const Modal = ({
   center, children, open, onClose, role, transparent, xy, zIndex,
}) => {
   const handleOnKeyUp = (event) => {
      // エスケープキーが押された場合にメニューを閉じる
      if (event.key === 'Escape') {
         onClose();
      }
   };

   const classList = new List(classes.inner);
   const modalClassList = new List(classes.modal);
   let style = {};

   if (transparent) {
      modalClassList.add(classes.transparent);
   }
   if (center) {
      classList.add(classes.center);
   }
   else if (xy.isRight) {
      style = { right: xy.x, top: xy.y };
   }
   else {
      style = { left: xy.x, top: xy.y };
   }

   return (
      <Fragment>
         {open && (
            <div
               onClick={onClose}
               onKeyUp={handleOnKeyUp}
               className={modalClassList.strList}
               role={role}
               style={{ zIndex }}
            >
               {children && (
                  <div className={classList.strList} style={style}>
                     {children}
                  </div>
               )}
            </div>
         )}
      </Fragment>
   );
};

Modal.defaultProps = {
   center: false,
   children: null,
   onClose: null,
   role: 'dialog',
   transparent: false,
   xy: { x: 0, y: 0 },
   zIndex: 100,
};

const {
   bool, func, number, node, shape, string,
} = PropTypes;

Modal.propTypes = {
   center: bool,
   children: node,
   open: bool.isRequired,
   onClose: func,
   role: string,
   transparent: PropTypes.bool,
   xy: shape({
      x: number.isRequired,
      y: number.isRequired,
   }),
   zIndex: number,
};

export default Modal;
