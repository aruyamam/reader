import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '../Grid/Grid';
import AppbarBtn from '../Buttons/LoginBtn/AppbarBtn';
import ToggleButton from '../ToggleBtn/ToggleButton';
import Typography from '../Typography/Typography';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import classes from './Navbar.css';

const Navbar = ({ closeDrawer, handleDrawer, user }) => {
   const [visibility, setVisibility] = useState(false);
   const [xy, setxy] = useState({ x: 0, y: 0 });

   const handleModal = () => {
      setVisibility(prevState => !prevState);
   };

   const handleOnClick = (event) => {
      const [rect] = event.target.getClientRects();
      const x = event.clientX || rect.x;
      const y = event.clientY || rect.y;
      setxy({ x: x - rect.width, y });
      handleModal();
   };

   return (
      <Grid className={classes.Navbar} container style={{ alignItems: 'center' }}>
         <Grid container style={{ alignItems: 'center' }}>
            {user.isAuthenticated && (
               <ToggleButton type="button" handler={handleDrawer} label="btn" />
            )}
            <Typography className={classes.title} as="h1">
               <Link to="/reader"> Reader</Link>
            </Typography>
         </Grid>
         <div>
            {user.isAuthenticated ? (
               <AppbarBtn onClick={handleOnClick} className={classes.logout}>
                  ログアウト
               </AppbarBtn>
            ) : (
               <Fragment>
                  <Link to="/login" className={classes.link}>
                     ログイン
                  </Link>
                  <Link to="/register" className={classes.link}>
                     登録
                  </Link>
               </Fragment>
            )}
         </div>

         <Modal open={visibility} onClose={handleModal} xy={xy} transparent>
            <Menu closeDrawer={closeDrawer} onClose={handleModal} />
         </Modal>
      </Grid>
   );
};

Navbar.propTypes = {
   closeDrawer: PropTypes.func.isRequired,
   handleDrawer: PropTypes.func.isRequired,
   user: PropTypes.shape({
      isAuthenticated: PropTypes.bool.isRequired,
   }).isRequired,
};

export default Navbar;
