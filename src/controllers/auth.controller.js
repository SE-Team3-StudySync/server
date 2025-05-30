import { StatusCodes } from "http-status-codes";
import { bodyToLogIn, bodyToUser } from "../dtos/auth.dto.js";
import { userLogIn, userSignUp } from "../services/auth.service.js";

export const handleUserSignUp = async (req, res, next) => {
  try{
    console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const userId = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).json({ userId: userId });
  }catch(err)
  {
    console.error("회원가입 실패:", err);
    res.status(StatusCodes.BAD_REQUEST).json({ message: "회원가입 실패: " + err.message });
  }
};

export const handleUserLogIn = async (req, res, next) => {
    console.log("로그인 요청을 받았습니다!");
    console.log("body:", req.body);
    
    const userInfo = await userLogIn(bodyToLogIn(req.body));
    res.status(StatusCodes.OK).json(userInfo);
};