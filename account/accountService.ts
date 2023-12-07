import {pool} from "../db.connection.config";
import { Buyer } from "./buyer";
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
    SELECT u.first_name,u.last_name,u.middle_name,u.email,u.house_number,u.street_name,u.city,u.state,u.zip_code,m._role,b.cash_balance,u._password
    FROM _user u
    LEFT OUTER JOIN manager m 
    ON u.email = m.email
    LEFT OUTER JOIN buyer b 
    ON b.email = u.email
    where u.email = ?
    `;
    return await pool.query<RowDataPacket[]>(sql, [email]);
}

export async function updateUser(user:User) {
    console.log(user)
    const sql: string =`
    UPDATE _user 
    SET first_name = ?,
     last_name = ?,
     middle_name = ?,
     house_number = ?,
     street_name = ?,
     city = ?,
     state = ?,
     zip_code = ?
    where email = ?
`;
    return await pool.query<RowDataPacket[]>(sql, [user.first_name,user.last_name,user.middle_name,user.house_number,user.street_name,user.city,user.state,user.zip_code,user.email]);
}

 


// INSERT: use ResultSetHeader
export async function insertUser(user: User) {
    const sql: string = `
        INSERT INTO _user
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(user));
    
}

export async function updateBalance(email:string,balance:number) {
    const sql: string = ` 
        Update buyer 
        SET cash_balance = ?
        where email = ?
    `;
    return await pool.query<ResultSetHeader>(sql, [balance,email]);
}

export async function insertBuyer(buyer:Buyer){
    const sql: string = `
        INSERT INTO buyer
        VALUES(?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(buyer));
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