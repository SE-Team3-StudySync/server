import { insertGroup, mappingGroupMember, selectAllGroups } from '../repositories/group.repository.js';
// import { responseGroupDto } from '../dtos/group.dto.js';

export const createGroup = async (groupData) => {
    try{
            const createdGroupId = await insertGroup(groupData);
            
            
            if(!createdGroupId) {
                throw new Error("그룹 생성에 실패했습니다.");
            }
   

            const insertGroupmember = await mappingGroupMember({
                groupId: createdGroupId,
                userId: groupData.creatorId,
            });

            if(!insertGroupmember) {
                throw new Error("그룹 생성 후, 그룹 멤버 추가에 실패했습니다.");
            };

            return createdGroupId;
             
        }catch (err){
            throw new Error(
                `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
            );
        }
};

export const getAllGroups = async () => {
    const groups = await selectAllGroups();
    // return groups.map(responseGroupDto);
};
