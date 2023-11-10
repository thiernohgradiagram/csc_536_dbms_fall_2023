import { pool } from "../db.connection.config";
import { Mercedes } from "./mercedes";


export async function getMercedes() {
    const sql: string = `
        SELECT * 
        FROM mercedes
    `

    const result = await pool.query(sql);
    const rows = result[0];
    const metaData = result[1];
    console.log(metaData);
    return rows;
}

//getMercedes().then(rows => console.log(rows));

async function getMercedesByVinNumber(vinNumber: string) {
    const sql: string = `
        SELECT * 
        FROM mercedes 
        WHERE vin_number = ?
    `

    const result = await pool.query(sql, [vinNumber]);
    const rows = result[0];
    const metaData = result[1];
    //console.log(metaData);
    return rows;
}

// getMercedesByVinNumber('benz-000-000-040').then(rows => console.log(rows));

async function insertMercedes(mercedes: Mercedes) {
    const sql: string = `
        INSERT INTO mercedes
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `

    const result = await pool.query(sql, Object.values(mercedes));

    const rows = result[0];
    const metaData = result[1];
    //console.log(result);
    return result;
}

//const mercedes1 = new Mercedes("benz-000-000-046","green","GLA 250 4MATIC SUV",2023,96778.99,"automatic","gas",4,1111,"fwd",null,4,null);
//insertMercedes(mercedes1)
//.then(result => console.log(result));