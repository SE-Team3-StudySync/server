import { pool } from "../db.config.js";

export const addUser = async(data) => {
    //pool으로 mysql에 연결
    const conn = await pool.getConnection();

    try{
        //동일 email이 있는지 확인
    const [confirm] = await pool.query(
      `SELECT EXISTS(SELECT 1 FROM user WHERE email = ?) as isExistEmail;`,
      data.email
    );

    if (confirm[0].isExistEmail) {
      return null;
    }

    const [result] = await pool.query(
      `INSERT INTO user (email, password, name, birth, student_id, major ) VALUES (?, ?, ?, ?, ?, ?);`,
      [
        data.email,
        data.password,
        data.name,
        data.birth,
        data.studentId,
        data.major,
      ]
    );

    return result.insertId;

  } catch (err) {
    throw new Error(
      `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
    );
  } finally {
    conn.release();
  }
};

export const authUser = async(data) => {
    const conn = await pool.getConnection();

    try{
        const [result] = await pool.query(
            `SELECT * FROM user WHERE email = ? AND password = ?;`,
            [data.email, data.password]
        );
        
        return result[0];

    } catch (err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    } finally {
        conn.release();
    }
}