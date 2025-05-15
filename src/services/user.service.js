import {
  responseUserInfoDto,
  responseInterestDto
} from "../dtos/user.dto.js";

import {
  getUserInfo,
  patchUserInfo,
  selectUserInterests,
  insertUserInterest,
  removeUserInterest
} from "../repositories/user.repository.js";



export const userInfo = async(data) => {
    try{
        const userInfo = await getUserInfo(data);

        if(!userInfo){
            throw new Error("해당 유저가 존재하지 않아요.");
        }

        return responseUserInfoDto(userInfo);
    }catch (err){
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }
}
export const updateUserInfo = async (userId, updateData) => {
  const updatedUser = await patchUserInfo(userId, updateData);
  return responseUserInfoDto(updatedUser);
};

export const getUserInterests = async (userId) => {
  const interests = await selectUserInterests(userId);
  return interests.map(responseInterestDto);
};

export const addUserInterest = async (userId, categoryId) => {
  const newInterest = await insertUserInterest(userId, categoryId);
  return responseInterestDto(newInterest);
};

export const deleteUserInterest = async (userInterestId) => {
  await removeUserInterest(userInterestId);
};