// src/routes/group.router.js
import express from 'express';
import { verifyTokenMiddleware } from '../middlewares/auth.middleware.js';
import {
  handleConfirmJoinRequest,
  handleCreateGroup,
  handleCreateRequestJoinGroup,
  handleGetGroupList
} from '../controllers/group.controller.js';

const groupRouter = express.Router();

// 그룹 생성 (로그인 필요)
groupRouter.post('/', verifyTokenMiddleware, handleCreateGroup);

// 그룹 목록 조회 (로그인 필요)
groupRouter.get('/', verifyTokenMiddleware, handleGetGroupList);

// 스터디 그룹 참가 요청 (로그인 필요)
groupRouter.post('/:groupId/request', verifyTokenMiddleware, handleCreateRequestJoinGroup);

// 스터디 그룹 참가 요청 처리 (로그인 필요, 방장 권한 확인 필요)
groupRouter.patch('/:groupId/members/:groupMemberId', verifyTokenMiddleware, handleConfirmJoinRequest);

export default groupRouter;