import {
  requestAddUserInterestDto,
  userHeaderDto,
} from "../dtos/user.dto.js";

import {
  userInfo,
  updateUserInfo,
  getUserInterests,
  addUserInterest,
  deleteUserInterest
} from "../services/user.service.js";

// GET /api/users
export const handleGetUserInfo = async(req, res) => {

  console.log("유저 정보 조회 요청을 받았습니다!");

  try{    
    const user = req.user;
    const userData = await userInfo(userHeaderDto(user));

    res.status(200).json(userData);
  }catch(err){
    return res.status(500).json({ message: "유저 정보 조회 실패" });
  }
};

// PATCH /api/users
// ❌ 프론트에 구현 필요x
export const handleUpdateUserInfo = async (req, res) => {

  console.log("유저 정보 업데이트 요청을 받았습니다!");
  try {
    const user = req.user;
    const updatedUser = await updateUserInfo(user.id, req.body);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/users/interests
export const handleGetUserInterests = async (req, res) => {
  console.log("유저 관심사 조회 요청을 받았습니다!");
  try {
    const interests = await getUserInterests(req.user.id);

    res.status(200).json(interests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users/interests
export const handleAddUserInterest = async (req, res) => {

  console.log("유저 관심사 추가 요청을 받았습니다!");

  try {
    
    const result = await addUserInterest(requestAddUserInterestDto({...req.body, userId: req.user.id}));
    console.log(result);
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/users/interest/:userInterestId
export const handleDeleteUserInterest = async (req, res) => {
  try {
    const userInterestId = req.params.userInterestId;
    await deleteUserInterest(userInterestId);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};