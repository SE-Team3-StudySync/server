import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/auth.middleware.js';
import { handleGetUserInfo } from '../controllers/user.controller.js';

const userRouter = express.Router();

// 사용자 정보 조회 API
userRouter.get('/me',verifyTokenMiddleware,handleGetUserInfo);

export default userRouter;