import React from 'react';
import PropTypes from 'prop-types';

const Grid = ({
   children, container, drawerWidth, open, style, classes,
}) => {
   let styles = {
      marginLeft: '0',
      display: container ? 'flex' : 'block',
      transition: 'All 0.3s ease-out',
      flex: '1 1 auto',
   };

   // if (open != undefined && !open) {
   //    styles.marginLeft = -drawerWidth;
   // }

   if (style) {
      styles = {
         ...styles,
         ...style,
      };
   }

   return (
      <div className={classes} style={styles}>
         {children}
      </div>
   );
};

// Grid.propTypes = {
//    children: PropTypes.element,
//    container: PropTypes.string,
//    drawerWidth: PropTypes.string,
//    open: PropTypes.bool,
//    style: PropTypes.object,
//    classes: PropTypes.string,
// };

export default Grid;
