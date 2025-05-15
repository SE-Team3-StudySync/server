import { insertGroup, selectAllGroups } from '../repositories/group.repository.js';
import { responseGroupDto } from '../dtos/group.dto.js';

export const createGroup = async (groupData) => {
    const group = await insertGroup(groupData);
    return responseGroupDto(group);
};

export const getAllGroups = async () => {
    const groups = await selectAllGroups();
    return groups.map(responseGroupDto);
};
