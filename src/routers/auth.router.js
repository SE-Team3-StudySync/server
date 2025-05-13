// router/auth.router.js
import express from 'express';
import { handleUserLogIn, handleUserSignUp } from '../controllers/auth.controller.js';

const authRouter = express.Router();

// 회원가입 API
authRouter.post('/users', handleUserSignUp);

// 로그인 API
authRouter.post('/login', handleUserLogIn);

export default authRouter;