/* eslint react/button-has-type: "off" */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classes from './ToggleButton.css';
import animate, { circ } from '../../helper/animation';

const ToggleButton = ({ type, handler, style }) => {
   const el = useRef(null);

   const animation = () => {
      el.current.style.opacity = 1;
      el.current.style.transform = 'translate(-50%, -50%) scale(0.5)';

      animate({
         duration: 400,
         timing: circ,
         draw: (progress) => {
            el.current.style.transform = `translate(-50%, -50%) scale(${progress})`;
            if (progress === 1) {
               el.current.style.opacity = 0;
            }
         },
      });
   };

   const handleOnClick = () => {
      handler();
      animation();
   };

   return (
      <button className={classes.ToggleBtn} onClick={handleOnClick} type={type} style={style}>
         <span className={classes.ToggleBtn__bar} />
         <span ref={el} className={classes.effect} />
      </button>
   );
};

ToggleButton.defaultProps = {
   handler: null,
   type: 'button',
   sytle: {},
};

ToggleButton.propTypes = {
   handler: PropTypes.func,
   type: PropTypes.string,
   style: PropTypes.object,
};

export default ToggleButton;
