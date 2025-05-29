import { pool } from "../db.config.js";

export const getUserInfo = async(data) => {
    const conn = await pool.getConnection();
    try {
        const [result] = await pool.query(
            `SELECT * FROM user WHERE id = ?;`,
            [data.userId]
        );

        return result[0];
    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
};

export const patchUserInfo = async (userId, data) => {
  const conn = await pool.getConnection();
  try {
    const fields = [];
    const values = [];
    for (const key in data) {
      fields.push(`${key} = ?`);
      values.push(data[key]);
    }
    values.push(userId);
    await conn.query(
      `UPDATE user SET ${fields.join(", ")} WHERE id = ?`,
      values
    );
    const [result] = await conn.query(
      `SELECT * FROM user WHERE id = ?`,
      [userId]
    );
    return result[0];
  } finally {
    conn.release();
  }
};

export const selectUserInterests = async (userId) => {
  const conn = await pool.getConnection();
  try {
    const [rows] = await conn.query(
      `SELECT interest_category.id, interest_category.category 
      FROM user_interest 
      JOIN interest_category ON user_interest.category_id = interest_category.id
      WHERE user_interest.user_id = ?`,
      [userId]
    );
    console.log(rows);

    //사용자가 관심사를 가지고 있지 않은 경우 빈 배열 반환
    if (rows.length === 0) {
      return [];
    }


    return rows;

  }catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`);
  }
   finally {
    conn.release();
  }
};

export const insertUserInterest = async (data) => {
  const conn = await pool.getConnection();
  try {
    // check 카테고리가 존재하는지 확인 -> return id
    const [confirm] = await conn.query(
      `SELECT id FROM interest_category WHERE category = ?`,
      [data.categoryName]
    )

    if(!confirm || confirm.length === 0) {
      throw new Error("해당 카테고리가 존재하지 않습니다.");
    }

    const categoryId = confirm[0].id;

    const [insertResult] = await conn.query(
      `INSERT INTO user_interest (user_id, category_id) VALUES (?, ?)`,
      [data.userId, categoryId]
    );

    if(!insertResult.affectedRows) {
      throw new Error("관심사 추가에 실패했습니다.");
    }

    // 성공적으로 추가된 경우, 새로 추가된 관심사의 ID와 카테고리 정보를 반환
    return {userInterestId : insertResult.insertId, categoryId: categoryId, categoryName: data.categoryName};

  } finally {
    conn.release();
  }
};

export const removeUserInterest = async (userInterestId) => {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      `DELETE FROM user_interest WHERE id = ?`,
      [userInterestId]
    );
  } finally {
    conn.release();
  }
};