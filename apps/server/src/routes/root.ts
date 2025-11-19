import express from 'express';
import signupRouter from './auth/signup.js';
import loginRouter from './auth/login.js';
import faceRegisterRouter from './face/register.js';

const router = express.Router();

router.use(express.json());

router.use('/auth', signupRouter, loginRouter);
router.use('/face', faceRegisterRouter);

export default router;