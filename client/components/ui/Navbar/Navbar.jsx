import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from '../Grid/Grid';
import NavbarBtn from '../Buttons/NavbarBtn/NavbarBtn';
import ToggleButton from '../Buttons/ToggleBtn/ToggleBtn';
import Typography from '../Typography/Typography';
import Menu from '../Menu/Menu';
import Modal from '../Modal/Modal';
import classes from './Navbar.css';

const Navbar = ({ closeDrawer, handleDrawer, user }) => {
   const [visibility, setVisibility] = useState(false);
   const [xy, setxy] = useState({ x: 0, y: 0, isRight: false });

   const handleModal = () => {
      setVisibility(prevState => !prevState);
   };

   const handleOnClick = (event) => {
      const [rect] = event.target.getClientRects();
      const { innerWidth } = window;
      const isRight = rect.x > innerWidth / 2;
      const y = event.clientY || rect.y;
      const x = isRight ? innerWidth - rect.right : event.target.offsetLeft;
      setxy({ x, y, isRight });
      handleModal();
   };

   return (
      <Grid className={classes.Navbar} container style={{ alignItems: 'center' }}>
         <Grid container style={{ alignItems: 'center' }}>
            {user.isAuthenticated && (
               <ToggleButton type="button" onClick={handleDrawer} label="btn" />
            )}
            <Typography className={classes.title} as="h1">
               <Link to="/reader"> Reader</Link>
            </Typography>
         </Grid>
         <div>
            {user.isAuthenticated ? (
               <NavbarBtn onClick={handleOnClick} className={classes.avatar}>
                  {user.username[0]}
               </NavbarBtn>
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
