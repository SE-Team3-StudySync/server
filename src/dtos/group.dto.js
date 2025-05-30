export const requestCreateGroupDto = (data) => {
    return {
        name : data.name,
        memberLimit: data.memberLimit,
        mode: data.mode,
        topic: data.topic,
        creatorId: data.userId,
    };
};

export const requestConfirmJoinRequestDto = (data) => {
    return { 
        groupId: data.params.groupId, 
        groupMemberId: data.params.groupMemberId, 
        userId: data.user.id, 
        isApproved: data.body.isApproved
    };  
};

export const responseConfirmJoinRequestDto = (data) => {
    return {
        userId: data.user_id,
        groupId: data.group_id,
        isApproved: data.is_approved,
    };
};