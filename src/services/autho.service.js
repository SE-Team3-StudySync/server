import { addUser, authUser } from "../repositories/auth.repository.js";

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

export const userLogIn = async(data) => {
    const loginUserId = await authUser({
        email: data.email,
        password: data.password,
    });

    if(loginUserId === 0) {
        throw new Error("이메일 또는 비밀번호가 일치하지 않습니다.");
    }
    return loginUserId;
}