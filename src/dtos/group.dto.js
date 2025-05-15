export const requestCreateGroupDto = (data) => {
    const { name, memberLimit, mode, topic, creator_id } = data;

    if (!name || !memberLimit || !mode || !topic || !creator_id) {
        throw new Error('필수 필드가 누락되었습니다.');
    }

    return {
        name,
        memberLimit,
        mode,
        topic,
        creator_id,
    };
};

export const responseGroupDto = (data) => {
    return {
        id: data.id,
        name: data.name,
        memberLimit: data.member_limit,
        mode: data.mode,
        topic: data.topic,
        creator_id: data.creator_id,
        createdAt: data.created_at,
        updatedAt: data.updated_at,
    };
};