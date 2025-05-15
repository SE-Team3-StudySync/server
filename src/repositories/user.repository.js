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
      `SELECT ui.id, ic.category 
       FROM user_interest ui
       JOIN interest_category ic ON ui.category_id = ic.id
       WHERE ui.user_id = ?`,
      [userId]
    );
    return rows;
  } finally {
    conn.release();
  }
};

export const insertUserInterest = async (userId, categoryId) => {
  const conn = await pool.getConnection();
  try {
    const [insertResult] = await conn.query(
      `INSERT INTO user_interest (user_id, category_id) VALUES (?, ?)`,
      [userId, categoryId]
    );
    const [row] = await conn.query(
      `SELECT ui.id, ic.category 
       FROM user_interest ui
       JOIN interest_category ic ON ui.category_id = ic.id
       WHERE ui.id = ?`,
      [insertResult.insertId]
    );
    return row[0];
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