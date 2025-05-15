import { createGroup, getAllGroups } from '../services/group.service.js';
import { requestCreateGroupDto } from '../dtos/group.dto.js';

export const handleCreateGroup = async (req, res) => {
    try {
        const creator_id = req.user.id;
        const groupData = requestCreateGroupDto({ ...req.body, creator_id });
        const createdGroup = await createGroup(groupData);
        res.status(201).json(createdGroup);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const handleGetGroupList = async (req, res) => {
    try {
        const groups = await getAllGroups();
        res.status(200).json(groups);
    } catch (err) {
        res.status(500).json({ message: '그룹 목록 조회 실패: ' + err.message });
    }
};