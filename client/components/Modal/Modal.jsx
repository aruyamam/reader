import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classes from './Modal.css';
import List from '../../helper/List';

const Modal = ({
   center, children, open, onClose, transparent, xy,
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
               role="dialog"
            >
               <div className={classList.strList} style={style}>
                  {children}
               </div>
            </div>
         )}
      </Fragment>
   );
};

Modal.defaultProps = {
   center: false,
   onClose: null,
   transparent: false,
   xy: { x: 0, y: 0 },
};

const {
   arrayOf, bool, element, func, number, oneOfType, shape, string,
} = PropTypes;

Modal.propTypes = {
   center: bool,
   children: oneOfType([string, element, arrayOf(oneOfType([element, bool]))]).isRequired,
   open: bool.isRequired,
   onClose: func,
   transparent: PropTypes.bool,
   xy: shape({
      x: number.isRequired,
      y: number.isRequired,
   }),
};

export default Modal;
