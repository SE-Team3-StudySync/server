import { userHeaderDto } from "../dtos/user.dto.js";
import { userInfo } from "../services/user.service.js";

export const handleGetUserInfo = async(req, res) => {
    console.log("유저 정보 조회 요청을 받았습니다!");

    const user = req.user;
    const userData = await userInfo(userHeaderDto(user));
    
    res.status(200).json(userData);
}