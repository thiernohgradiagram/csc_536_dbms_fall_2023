import {pool} from "../db.connection.config";
import {Branch} from "./branch";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export async function getAllBranches() {
    const sql: string = `
    SELECT b.branch_name,m.branch_id,b.branch_number,b.street_name,b.city,b.state,b.zip_code, COUNT(m.branch_id) total, u.first_name,u.last_name
     FROM branch b 
    LEFT OUTER JOIN _user u ON b.email = u.email 
    LEFT OUTER join mercedes m ON m.branch_id = b.branch_id
    GROUP BY m.branch_id, b.branch_name,u.first_name,b.branch_number,b.street_name,b.city,b.state,b.zip_code
        `;
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
         VALUES(?, ?, ?, ?, ?, ?, ?,?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(branch));
    
}

// Update mercedes: use ResultSetHeader

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader