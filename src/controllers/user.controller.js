import {
  userHeaderDto,
  responseUserInfoDto,
  responseInterestDto
} from "../dtos/user.dto.js";

import {
  userInfo,
  updateUserInfo,
  getUserInterests,
  addUserInterest,
  deleteUserInterest
} from "../services/user.service.js";

export const handleGetUserInfo = async(req, res) => {
    console.log("유저 정보 조회 요청을 받았습니다!");

    const user = req.user;
    const userData = await userInfo(userHeaderDto(user));
    
    res.status(200).json(userData);
};

// PATCH /api/users
export const handleUpdateUserInfo = async (req, res) => {
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
  try {
    const userId = req.user.id;
    const interests = await getUserInterests(userId);
    res.status(200).json(interests);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST /api/users/interests
export const handleAddUserInterest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { category_id } = req.body;
    if (!category_id) {
      return res.status(400).json({ message: "category_id is required" });
    }
    const result = await addUserInterest(userId, category_id);
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