import {pool} from "../db.connection.config";
import {Mercedes} from "./mercedes";
import {ResultSetHeader, RowDataPacket} from "mysql2";

export async function getAllMercedes() {
    const sql: string = `
        SELECT * 
        FROM mercedes`;
    return await pool.query<RowDataPacket[]>(sql);
}

export async function getMercedesByVinNumber(vinNumber: string) {
    const sql: string = `
        SELECT * 
        FROM mercedes 
        WHERE vin_number = ?`;
    return await pool.query<RowDataPacket[]>(sql, [vinNumber]);
}

export async function getMercedesByYearAndColor(year: string, color: string) {
    const sql: string =`
    SELECT * 
    FROM mercedes
    WHERE _year = ? AND color= ?`;
    return await pool.query<RowDataPacket[]>(sql, [year, color]);
}


// INSERT: use ResultSetHeader
export async function insertMercedes(mercedes: Mercedes) {
    const sql: string = `
        INSERT INTO mercedes
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(mercedes));
}

//const mercedes1 = new Mercedes("benz-000-000-046","green","GLA 250 4MATIC SUV",2023,96778.99,"automatic","gas",4,1111,"fwd",null,4,null);
//insertMercedes(mercedes1)
//.then(result => console.log(result));

// Update mercedes: use ResultSetHeader

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader