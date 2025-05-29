import { pool } from '../db.config.js';

export const insertGroup = async (data) => {

    const conn = await pool.getConnection();
    try{

        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM study_group WHERE name = ?) as isExistGroup;`,
            data.name
        );

        // 이미 존재하는 group인지 확인 -> 존재시 error 반환
        if( confirm[0].isExistGroup ) {
            throw new Error("이미 존재하는 스터디 그룹 이름입니다.");
        }

        // study_goup 테이블 추가
        const [result] = await pool.query(`
            INSERT INTO study_group (name, member_limit, mode, topic, creator_id)
            VALUES (?, ?, ?, ?, ?)
        `, [data.name, data.memberLimit, data.mode, data.topic, data.creatorId]);
        
        console.log(result);

        if(!result){
            return null;
        }

        return result.insertId;

    }catch(err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }finally {
        conn.release();
    }
};

// 그룹 생성 후, group member 테이블에 owner 추가
export const mappingGroupMember = async (data) => {

    const conn = await pool.getConnection();

    try{
        const [result] = await pool.query(`
            INSERT INTO group_member (group_id, user_id, is_approved, role)
            VALUES (?, ?, ?, ?)
        `, [data.groupId, data.userId, 1, 'owner']);

        if(!result) {
            return null;
        }

        return result;

    }catch(err) {
        throw new Error(
            `오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err})`
        );
    }finally {
        conn.release();
    }
};

export const selectAllGroups = async () => {
    const [rows] = await pool.query(`SELECT * FROM study_group`);
    return rows;
};