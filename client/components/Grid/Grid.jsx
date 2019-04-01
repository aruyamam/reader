import React from 'react';
import PropTypes from 'prop-types';
import gridClasses from './Grid.css';

const Grid = ({
   children, className, container, style,
}) => {
   const classList = [gridClasses.grid];

   if (container) {
      classList.push(gridClasses.flex);
   }
   else {
      classList.push(gridClasses.block);
   }
   if (className) {
      classList.push(className);
   }

   return (
      <div className={classList.join(' ')} style={style}>
         {children}
      </div>
   );
};

Grid.defaultProps = {
   className: '',
   container: false,
   style: {},
};

Grid.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.bool, PropTypes.element])),
      PropTypes.string,
      PropTypes.element,
   ]).isRequired,
   className: PropTypes.string,
   container: PropTypes.bool,
   style: PropTypes.object,
};

export default Grid;
