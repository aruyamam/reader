import express from 'express';
import authCtrl from '../controllers/auth.controller';

const router = express.Router();

// /auth/*
router.route('/register').post(authCtrl.register);
router.route('/login').post(authCtrl.login);

export default router;
