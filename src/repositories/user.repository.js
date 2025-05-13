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