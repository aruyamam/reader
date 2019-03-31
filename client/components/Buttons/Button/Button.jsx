import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';

const types = {
   button: 'button',
   submit: 'submit',
   reset: 'reset',
};

const Button = ({
   children, fit, label, type, onClick, style,
}) => {
   const classNames = [classes.btn];
   let btnType = type;
   if (!Object.keys(types).includes(type)) {
      btnType = types.button;
   }
   if (fit) {
      classNames.push(classes.fit);
   }

   return (
      /* eslint react/button-has-type: "off"  */
      <button className={classNames.join(' ')} onClick={onClick} style={style} type={btnType}>
         {label || children}
      </button>
   );
};

Button.defaultProps = {
   fit: false,
   label: '',
   type: 'button',
   onClick: null,
   style: {},
};

Button.propTypes = {
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
   fit: PropTypes.bool,
   label: PropTypes.string,
   type: PropTypes.string,
   onClick: PropTypes.func,
   style: PropTypes.object,
};

export default Button;
