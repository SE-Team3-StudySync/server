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

export const createJoinRequest = async (data) => {
    const conn = await pool.getConnection();

    try{
        const [confirm] = await pool.query(
            `SELECT EXISTS(SELECT 1 FROM group_member WHERE group_id = ? AND user_id = ?) as isExistRequest;`,
            [data.groupId, data.userId]
        );

        // 이미 존재하는 요청인지 확인 -> 존재시 error 반환
        if(confirm[0].isExistRequest ) {
            throw new Error("이미 해당 그룹에 참가 요청을 보냈습니다.");
        };

        const [result] = await pool.query(`
            INSERT INTO group_member (group_id, user_id, is_approved, role)
            VALUES (?, ?, ?, ?)
        `, [data.groupId, data.userId, 0, 'member']);

        if(!result) {
            return null;
        }

        return result.insertId;

    }catch(err) {
        throw err;
    }finally {
        conn.release();
    };
};

export const updateConfirmJoinRequest = async (data) => {
    const conn = await pool.getConnection();

    try{
        // 요청이 존재하는지 확인
        const [confirm] = await pool.query(
            `SELECT * FROM group_member WHERE id = ?`,
            [data.groupMemberId]
        );

        if(confirm.length === 0) {
            throw new Error("해당 그룹 참가 요청이 존재하지 않습니다.");
        }
        else if(confirm[0].is_approved === 1) {
            throw new Error("이미 승인된 그룹 참가 요청입니다.");
        };
        
        await pool.query(`
            UPDATE group_member
            SET is_approved = ? 
            WHERE id = ?`, 
            [data.isApproved, data.groupMemberId]);
        
        const [response] = await pool.query(`
            SELECT * FROM group_member WHERE id = ?`, 
            [data.groupMemberId]);

        if(response[0].is_approved != data.isApproved) {
            throw new Error("그룹 참가 요청 처리에 실패했습니다.");
        }
        
        return response[0];
    }catch(err) {
        throw err;
    }finally {
        conn.release();
    }
}