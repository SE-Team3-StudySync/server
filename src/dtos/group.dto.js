export const requestCreateGroupDto = (data) => {
    return {
        name : data.name,
        memberLimit: data.memberLimit,
        mode: data.mode,
        topic: data.topic,
        creatorId: data.userId,
    };
};
