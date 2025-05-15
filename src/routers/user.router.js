import express from "express";
import { verifyTokenMiddleware } from "../middlewares/auth.middleware.js";
import {
  handleGetUserInfo,
  handleUpdateUserInfo,
  handleGetUserInterests,
  handleAddUserInterest,
  handleDeleteUserInterest
} from "../controllers/user.controller.js";


const userRouter = express.Router();

// 사용자 정보 조회 API
userRouter.get('/me',verifyTokenMiddleware,handleGetUserInfo);

export default userRouter;

// 사용자 정보 수정
userRouter.patch("/", verifyTokenMiddleware, handleUpdateUserInfo);

// 관심 분야 목록 조회
userRouter.get("/interests", verifyTokenMiddleware, handleGetUserInterests);

// 관심 분야 추가
userRouter.post("/interests", verifyTokenMiddleware, handleAddUserInterest);

// 관심 분야 삭제
userRouter.delete("/interest/:userInterestId", verifyTokenMiddleware, handleDeleteUserInterest);
