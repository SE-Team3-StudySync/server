import { createGroup, getAllGroups } from '../services/group.service.js';
import { requestCreateGroupDto } from '../dtos/group.dto.js';

export const handleCreateGroup = async (req, res, next) => {
    try {
        const data = requestCreateGroupDto({ ...req.body, userId: req.user.id });
        
        const createdGroupId = await createGroup(data);
        res.status(201).json({groupId : createdGroupId});
        
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