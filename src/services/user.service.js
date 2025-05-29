import {
  requestAddUserInterestDto,
  responseAddUserInterestDto,
  responseUserInfoDto,
  responseUserInterestDto
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
  try{  
    const interests = await selectUserInterests(userId);
    
    if(interests.length === 0) {
      return [];
    }

    return interests.map(responseUserInterestDto);
  }catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
};

export const addUserInterest = async (data) => {
  try{
    
    const newInterest = await insertUserInterest(data);

    return responseAddUserInterestDto(newInterest);

  }catch(err){
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};

export const deleteUserInterest = async (data) => {
  try{
    const result = await removeUserInterest(data);

    if(result.affectedRows === 0) {
      throw new Error("해당 관심사가 존재하지 않아요.");
    }

    return {
      message: "관심사가 삭제되었습니다.",
      deletedId: data.userInterestId,
    };

  }catch(err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  }
};