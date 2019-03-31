import React from 'react';
import PropTypes from 'prop-types';
import gridClasses from './Grid.css';

const Grid = ({
   children, classes, container, style,
}) => {
   const classList = [gridClasses.grid];

   if (container) {
      classList.push(gridClasses.flex);
   }
   else {
      classList.push(gridClasses.block);
   }
   if (classes) {
      classList.push(classes);
   }

   return (
      <div className={classList.join(' ')} style={style}>
         {children}
      </div>
   );
};

Grid.defaultProps = {
   classes: '',
   container: false,
   style: {},
};

Grid.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.string,
      PropTypes.element,
   ]).isRequired,
   classes: PropTypes.string,
   container: PropTypes.bool,
   style: PropTypes.object,
};

export default Grid;
