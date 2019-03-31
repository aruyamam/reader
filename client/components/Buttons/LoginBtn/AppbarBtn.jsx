import React from 'react';
import PropTypes from 'prop-types';
import classes from './AppbarBtn.css';

const types = {
   button: 'button',
   submit: 'submit',
   reset: 'reset',
};

const AppbarBtn = ({
   children, className, label, type, onClick,
}) => {
   const classNames = [classes.appbarBtn];
   let btnType = type;
   if (!Object.keys(types).includes(type)) {
      btnType = types.button;
   }
   if (className) {
      classNames.push(className);
   }

   /* eslint react/button-has-type: "off"  */
   return (
      <button className={classNames.join(' ')} onClick={onClick} type={btnType}>
         {label || children}
      </button>
   );
};

AppbarBtn.defaultProps = {
   className: '',
   label: '',
   onClick: null,
   type: 'button',
};

AppbarBtn.propTypes = {
   className: PropTypes.string,
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
   label: PropTypes.string,
   onClick: PropTypes.func,
   type: PropTypes.string,
};

export default AppbarBtn;
