import { pool } from '../db.config.js';

export const insertGroup = async ({ name, memberLimit, mode, topic, creator_id }) => {
    const query = `
        INSERT INTO study_group (name, member_limit, mode, topic, creator_id)
        VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await pool.query(query, [name, memberLimit, mode, topic, creator_id]);

    const [group] = await pool.query(`SELECT * FROM study_group WHERE id = ?`, [result.insertId]);
    return group[0];
};

export const selectAllGroups = async () => {
    const [rows] = await pool.query(`SELECT * FROM study_group`);
    return rows;
};