import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './TextField.css';

const intialStyle = {
   position: 'relative',
   top: '-2px',
   left: '50%',
   display: 'block',
   width: '0px',
   height: '3px',
   backgroundColor: '#000',
   transform: 'translateX(-50%)',
   transition: 'all .4s ease-out',
};

const labelStyle = {
   top: '0',
   fontSize: '0.8rem',
};

const inActiveLblStyle = {
   top: '1.2rem',
   fontSize: '1rem',
};

const TextField = (props) => {
   const [style, setStyle] = useState(intialStyle);
   const [lblStyle, setLblStyle] = useState({});

   const handleBlur = (event) => {
      if (event.target.value === '') {
         setLblStyle(prevStyle => ({
            ...prevStyle,
            ...inActiveLblStyle,
         }));
      }

      setStyle(prevStyle => ({
         ...prevStyle,
         width: '0',
         backgroundColor: 'black',
      }));
   };

   const handleFocus = () => {
      setLblStyle(prevStyle => ({
         ...prevStyle,
         ...labelStyle,
      }));
      setStyle(prevStyle => ({
         ...prevStyle,
         width: '100%',
         backgroundColor: props.color,
      }));
   };

   return (
      <div className={classes.Outer}>
         <input
            className={classes.TextField}
            id={props.id}
            type={props.type}
            placeholder={props.placeholder}
            name={props.id}
            value={props.value}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={props.onChange}
         />
         {props.label && (
            <label className={classes.Label} htmlFor={props.id} style={lblStyle}>
               {props.label}
            </label>
         )}
         <div style={style} />
      </div>
   );
};

TextField.defaultProps = {
   color: '#0069c0',
   id: '',
   label: '',
   placeholder: '',
   type: 'text',
};

TextField.propTypes = {
   color: PropTypes.string,
   id: PropTypes.string,
   label: PropTypes.string,
   placeholder: PropTypes.string,
   type: PropTypes.string,
};

export default TextField;
