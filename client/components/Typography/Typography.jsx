import React from 'react';
import PropTypes from 'prop-types';
import classes from './Typography.css';
import List from '../../helper/List';

const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
const aligns = ['left', 'center', 'right'];

const Typography = ({
   align, as, children, className, style,
}) => {
   let Element = as;
   let textAlign = align;
   const classList = new List(classes.Typography);

   if (!elements.includes(Element)) {
      Element = 'p';
   }
   if (!aligns.includes(align)) {
      textAlign = 'left';
   }

   if (textAlign) {
      classList.add(classes[textAlign]);
   }
   if (className) {
      classList.add(className);
   }

   return (
      <Element className={classList.strList} style={style}>
         {children}
      </Element>
   );
};

Typography.defaultProps = {
   as: 'p',
   align: 'left',
   style: {},
};

Typography.propTypes = {
   align: PropTypes.string,
   as: PropTypes.string,
   children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
   style: PropTypes.object,
};

export default Typography;
