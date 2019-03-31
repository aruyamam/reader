import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './TextField.css';
import ClassList from '../../../helper/List';

const TextField = ({
   color,
   error,
   id,
   label,
   messages,
   type,
   placeholder,
   touched,
   value,
   onBlur,
   onChange,
}) => {
   const [effectClassList, seteffectClassList] = useState([classes.effect]);
   const [lblClassList, setLblClassList] = useState([classes.label]);

   const handleBlur = (event) => {
      if (event.target.value === '') {
         setLblClassList([classes.label]);
      }

      if (onBlur) {
         onBlur(event);
      }
      seteffectClassList([classes.effect]);
   };

   const handleFocus = () => {
      setLblClassList(prevState => [...prevState, classes.isActive]);
      seteffectClassList(prevState => [...prevState, classes.isActive]);
   };

   const handleOnChange = (event) => {
      if (onChange) {
         onChange(event);
      }
   };

   return (
      <div className={classes.Outer}>
         <input
            className={classes.TextField}
            id={id}
            type={type}
            placeholder={placeholder}
            name={id}
            value={value}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onChange={handleOnChange}
         />
         {label && (
            /* eslint jsx-a11y/label-has-for: "off"  */
            <label className={lblClassList.join(' ')} htmlFor={id}>
               {label}
            </label>
         )}
         <div
            className={effectClassList.join(' ')}
            style={{
               backgroundColor: error ? 'red' : color,
            }}
         />
         {error && <p className={classes.error}>{`${messages[0]}`}</p>}
      </div>
   );
};

TextField.defaultProps = {
   color: '#0069c0',
   id: '',
   label: '',
   onChange: null,
   placeholder: '',
   type: 'text',
   value: '',
};

TextField.propTypes = {
   color: PropTypes.string,
   id: PropTypes.string,
   label: PropTypes.string,
   onChange: PropTypes.func,
   placeholder: PropTypes.string,
   type: PropTypes.string,
   value: PropTypes.string,
};

export default TextField;
