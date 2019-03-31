import React from 'react';
import PropTypes from 'prop-types';
import classes from './Typography.css';

const elements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'];
const aligns = ['left', 'center', 'right'];

const Typography = ({
   as, children, align, style,
}) => {
   let Element = as;
   let textAlign = align;
   const classNames = [classes.Typography];

   if (!elements.includes(Element)) {
      Element = 'p';
   }
   if (!aligns.includes(align)) {
      textAlign = 'left';
   }

   if (textAlign) {
      classNames.push(classes[textAlign]);
   }

   return (
      <Element className={classNames.join(' ')} style={style}>
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
