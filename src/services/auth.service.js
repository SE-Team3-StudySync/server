import { addUser, authUser } from "../repositories/auth.repository.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import { bodyFromLogIn } from "../dtos/auth.dto.js";

dotenv.config();

const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY;
const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY;

export const userSignUp = async (data) => {
    const joinUserId = await addUser({
        email: data.email,
        password: data.password,
        name: data.name,
        birth: data.birth,
        studentId: data.studentId,
        major: data.major,
    });

    if (joinUserId === null) {
        throw new Error("이미 존재하는 이메일입니다.");
    };

    return joinUserId;
};

export const userLogIn = async (data) => {
    try {
        const loginUser = await authUser({
            email: data.email,
            password: data.password,
        });


        if (loginUser === 0) {
            throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
        };
        
        //loginUser는 로그인한 유저의 모든 정보를 담고 있기 때문에 token에 담을 정보만 추려서 만들어준다.
        const payloadUserInfo = {
            id: loginUser.id,
            email: loginUser.email,
            name: loginUser.name
        };   

        // access 토큰 발행
        // JWT_SECRET_KEY는 비밀키로 사용, expiresIn은 만료시간으로 사용
        const accessToken = jwt.sign(payloadUserInfo, ACCESS_TOKEN_SECRET_KEY, { expiresIn: '3h' });

        // refresh 토큰 발행
        const refreshToekn = jwt.sign(payloadUserInfo, REFRESH_TOKEN_SECRET_KEY, { expiresIn: '1h' });

        return bodyFromLogIn({
            //구조분해 할당 (userid, email, name )
            ...payloadUserInfo,
            accessToken: accessToken,
            refreshToken: refreshToekn
        });

    } catch (err) {
        throw new Error("로그인에 실패했습니다.");
    }
}