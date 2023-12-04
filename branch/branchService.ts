import {pool} from "../db.connection.config";
import {Branch} from "./branch";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export async function getAllBranches() {
    const sql: string = `
    SELECT b.branch_name,m.branch_id,b.branch_number,b.street_name,b.city,b.state,b.zip_code, COUNT(m.branch_id) total, u.first_name,u.last_name
     FROM branch b 
    RIGHT OUTER JOIN _user u ON b.email = u.email 
    RIGHT OUTER join mercedes m ON m.branch_id = b.branch_id
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

export async function getBranchesWithoutManagers() {
    const sql: string =`
    select * from branch where email is null`;
    return await pool.query<RowDataPacket[]>(sql, []);
}

export async function getAllUsersWithoutBranch() {
    const sql: string = `
    select first_name,last_name,email 
    from _user
    where email not in 
    (select email from manager)`;
    return await pool.query<RowDataPacket[]>(sql);
}

export async function getAllMercedesByManagerEmail(email:string) {
    const sql: string = `
    select m.vin_number,m.color,m.model,m._year,m.price,
    m.transmission,m.fuel,b.branch_name,b.branch_id,
    m.number_of_cylinders,m.mileage,m.drive,mg.email,im.image_path
    from mercedes m
    right outer join branch b on m.branch_id = b.branch_id 
    right outer join manager mg on mg.email = b.email
    left outer join mercedes_images im on im.vin_number = m.vin_number
    where mg.email = ? 
    group by m.vin_number,im.image_path
    `;
    return await pool.query<RowDataPacket[]>(sql, [email]);
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