// src/routes/group.router.js
import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/auth.middleware.js';
import {
  handleCreateGroup,
  handleGetGroupList
} from '../controllers/group.controller.js';

const groupRouter = express.Router();

// 그룹 생성 (로그인 필요)
groupRouter.post('/', verifyTokenMiddleware, handleCreateGroup);

// 그룹 목록 조회 (로그인 필요)
groupRouter.get('/', verifyTokenMiddleware, handleGetGroupList);

export default groupRouter;