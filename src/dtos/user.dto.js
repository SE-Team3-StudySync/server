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

export const responseUserInterestDto = (data) => {
  return {
    categoryId: data.id,
    categoryName: data.category
  };
};

export const requestAddUserInterestDto = (data) => {
  return {
    userId: data.userId,
    categoryName: data.categoryName
  };
};

export const responseAddUserInterestDto = (data) => {
  return {
    insertId: data.userInterestId,
    categoryId: data.categoryId,
    categoryName: data.categoryName,
  }
}