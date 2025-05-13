export const bodyToUser = (body) => {

    return {
        email: body.email,
        password: body.password,
        birth: body.birth,
        name: body.name,
        studentId: parseInt(body.studentId),
        major: body.major,
    };

};

export const bodyToLogIn = (body) => {

    return{
        email: body.email,
        password: body.password,
    };
};

export const bodyFromLogIn = (data) => {
  return {
    id: data.id,
    name: data.name,
    accessToken: data.accessToken,
    refreshToken: data.refreshToken
  }
}