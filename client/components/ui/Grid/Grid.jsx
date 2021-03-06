import React from 'react';
import PropTypes from 'prop-types';
import gridClasses from './Grid.css';

const Grid = React.forwardRef(({
   children, className, container, onScroll, style,
}, ref) => {
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
      <div ref={ref} className={classList.join(' ')} style={style} onScroll={onScroll}>
         {children}
      </div>
   );
});

Grid.defaultProps = {
   className: '',
   container: false,
   onScroll: null,
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
   onScroll: PropTypes.func,
   style: PropTypes.object,
};

export default Grid;
