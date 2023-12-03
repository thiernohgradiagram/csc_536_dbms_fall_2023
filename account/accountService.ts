import {pool} from "../db.connection.config";
import { Manager } from "./manager";
import {User} from "./user";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export async function getAllUsers() {
    const sql: string = `
        SELECT * 
        FROM _user`;
    return await pool.query<RowDataPacket[]>(sql);
}

export async function getUsersByEmail(email: string) {
    const sql: string = `
        SELECT * 
        FROM _user 
        WHERE email = ?`;
    return await pool.query<RowDataPacket[]>(sql, [email]);
}

export async function updateUser(year: string, color: string) {
    const sql: string =`
    SELECT * 
    FROM mercedes
    WHERE _year = ? AND color= ?`;
    return await pool.query<RowDataPacket[]>(sql, [year, color]);
}


// INSERT: use ResultSetHeader
export async function insertUser(user: User) {
    const sql: string = `
        INSERT INTO _user
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(user));
    
}

export async function insertManager(manager: Manager) {
    const sql: string = `
        INSERT INTO manager
        VALUES(?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(manager));
}

export async function updateBranchManagerEmail(email: string,branch_id:number) {
    const sql: string = `
        UPDATE branch
        SET email = ? 
        WHERE branch_id = ?
    `;
    return await pool.query<ResultSetHeader>(sql, [email,branch_id]);
}




// Update mercedes: use ResultSetHeader

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader