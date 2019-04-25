import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Landing.css';

const Landing = () => (
   <Link to="/reader" className={classes.link}>
      <div className={classes.home}>
         <div className={classes.heading}>
            <h1 className={classes.title}>
               ようこそ
               <span className={classes.en}>Reader</span>
へ
            </h1>
         </div>
      </div>
   </Link>
);

export default Landing;
