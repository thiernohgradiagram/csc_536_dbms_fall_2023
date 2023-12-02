import {pool} from "../db.connection.config";
import {Branch} from "./branch";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export async function getAllBranches() {
    const sql: string = `
        SELECT * 
        FROM branch`;
    return await pool.query<RowDataPacket[]>(sql);
}

export async function getBranchByEmail(email: string) {
    const sql: string = `
        SELECT * 
        FROM branch 
        WHERE email = ?`;
    return await pool.query<RowDataPacket[]>(sql, [email]);
}

export async function getBranchById(id: number) {
    const sql: string = `
        SELECT * 
        FROM branch 
        WHERE id = ?`;
    return await pool.query<RowDataPacket[]>(sql, [id]);
}

export async function updateBranch(id: string, branch: Branch) {
    const sql: string =`
    SELECT * 
    FROM mercedes
    WHERE _year = ? AND color= ?`;
    return await pool.query<RowDataPacket[]>(sql, []);
}


// INSERT: use ResultSetHeader
export async function insertBranch(branch: Branch) {
    const sql: string = `
        INSERT INTO branch
        VALUES(?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(branch));
    
}

// Update mercedes: use ResultSetHeader

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader