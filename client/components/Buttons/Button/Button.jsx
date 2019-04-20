import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './Button.css';
import animate, { circ } from '../../../helper/animation';
import ClassList from '../../../helper/List';

const types = {
   button: 'button',
   submit: 'submit',
   reset: 'reset',
};

const sizes = {
   small: 'small',
   medium: 'medium',
   large: 'large',
};

const Button = ({
   className, children, fit, label, type, onClick, size, style,
}) => {
   const el = useRef(null);
   const classList = new ClassList(classes.btn);
   let btnType = type;
   let btnSize = size;

   if (!Object.keys(types).includes(type)) {
      btnType = types.button;
   }
   if (!Object.keys(sizes).includes(size)) {
      btnSize = sizes.medium;
   }
   if (fit) {
      classList.add(classes.fit);
   }
   if (className) {
      classList.add(className);
   }

   classList.add(classes[btnSize]);

   const animation = () => {
      el.current.style.opacity = 1;
      el.current.style.transform = 'translate(-50%, -50%) scaleX(0.0)';

      animate({
         duration: 400,
         timing: circ,
         draw: (progress) => {
            if (el.current) {
               el.current.style.transform = `translate(-50%, -50%) scaleX(${progress})`;
               if (progress === 1) {
                  el.current.style.opacity = 0;
               }
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
      <button className={classList.strList} onClick={handleOnClick} style={style} type={btnType}>
         {label || children}
         <span ref={el} className={classes.effect} />
      </button>
   );
};

Button.defaultProps = {
   className: '',
   fit: false,
   label: '',
   size: 'medium',
   type: 'button',
   onClick: null,
   style: {},
};

Button.propTypes = {
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
   className: PropTypes.string,
   fit: PropTypes.bool,
   label: PropTypes.string,
   type: PropTypes.string,
   onClick: PropTypes.func,
   size: PropTypes.string,
   style: PropTypes.object,
};

export default Button;
