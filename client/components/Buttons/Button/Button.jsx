import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';
import animate, { circ } from '../../../helper/animation';

const types = {
   button: 'button',
   submit: 'submit',
   reset: 'reset',
};

const Button = ({
   children, fit, label, type, onClick, style,
}) => {
   const el = useRef(null);
   const classNames = [classes.btn];
   let btnType = type;

   if (!Object.keys(types).includes(type)) {
      btnType = types.button;
   }
   if (fit) {
      classNames.push(classes.fit);
   }

   const animation = () => {
      el.current.style.opacity = 1;
      el.current.style.transform = 'translate(-50%, -50%) scaleX(0.0)';

      animate({
         duration: 400,
         timing: circ,
         draw: (progress) => {
            el.current.style.transform = `translate(-50%, -50%) scaleX(${progress})`;
            if (progress === 1) {
               el.current.style.opacity = 0;
            }
         },
      });
   };

   const handleOnClick = () => {
      if (onClick) {
         onClick();
      }
      animation();
   };

   return (
      /* eslint react/button-has-type: "off"  */
      <button className={classNames.join(' ')} onClick={handleOnClick} style={style} type={btnType}>
         {label || children}
         <span ref={el} className={classes.effect} />
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
