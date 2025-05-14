export const userHeaderDto = (user) => {
    return {
        userId: user.id,
    };
};

export const responseUserInfoDto = (data) => {
    return {
        id: data.id,
        name: data.name,
        email: data.email,
        birth: data.birth,
        studentId: data.student_id,
        major: data.major
    };
};