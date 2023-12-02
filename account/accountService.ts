import {pool} from "../db.connection.config";
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

// Update mercedes: use ResultSetHeader

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader