import { createGroup, createRequestJoin, createResponseJoin, getAllGroups } from '../services/group.service.js';
import { requestConfirmJoinRequestDto, requestCreateGroupDto } from '../dtos/group.dto.js';

export const handleCreateGroup = async (req, res, next) => {
    console.log('그룹 생성 요청을 받았습니다!');
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

export const handleCreateRequestJoinGroup = async (req, res) => {
    console.log('그룹 참가 요청을 보냈습니다!');

    try{
        const reqGroup = await createRequestJoin({ groupId : req.params.groupId, userId: req.user.id});

        res.status(201).json({ message: '그룹 참가 요청이 성공적으로 생성되었습니다.', requestId: reqGroup });
    }catch (err) {
        res.status(400).json({ message: '그룹 참가 요청 생성 실패: ' + err.message });
    }
};

export const handleConfirmJoinRequest = async (req, res) => {
    console.log('그룹 참가 처리 요청을 받았습니다!');

    try {
        const resGroup = await createResponseJoin(requestConfirmJoinRequestDto(req));

        res.status(200).json({ message: '그룹 참가 요청이 성공적으로 처리되었습니다.', response: resGroup });
    }catch (err) {
        res.status(400).json({ message: '그룹 참가 요청 처리 실패: ' + err.message });
    }
}