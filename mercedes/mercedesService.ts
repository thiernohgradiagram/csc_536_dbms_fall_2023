import {pool} from "../db.connection.config";
import {Mercedes} from "./mercedes";
import {ResultSetHeader, RowDataPacket} from "mysql2";
import { Mercedes_images } from "./mercedes_images";

export async function getAllMercedes() {
    const sql: string = `
    select m.vin_number,m.color,m.model,m._year,m.price,
    m.transmission,m.fuel, m.number_of_cylinders,m.mileage,
    m.drive,mi.image_path
    from mercedes m
    left outer join mercedes_images mi on mi.vin_number = m.vin_number
    where m.email is null 
    group by m.vin_number,mi.image_path,m.color,m.model,m._year,m.price,
    m.transmission,m.fuel, m.number_of_cylinders,m.mileage,
    m.drive
`;
    return await pool.query<RowDataPacket[]>(sql);
}

export async function getMercedesByVinNumber(vinNumber: string) {
    const sql: string = `
    select * from mercedes m 
    left outer join mercedes_images mi
    on m.vin_number = mi.vin_number 
    where m.vin_number = ?
    `;
    return await pool.query<RowDataPacket[]>(sql, [vinNumber]);
}

export async function checkUserBalance(price: number, email: string) {
    const sql: string =`
    select cash_balance - ? as balance
    from buyer where email = ?
    `;
    return await pool.query<RowDataPacket[]>(sql, [price, email]);
}


// INSERT: use ResultSetHeader
export async function insertMercedes(mercedes: Mercedes) {
    const sql: string = `
        INSERT INTO mercedes
        VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    return await pool.query<ResultSetHeader>(sql, Object.values(mercedes));
}

export async function insertMercedesImages(images: any[]) {
    const sql: string = `
        INSERT INTO mercedes_images (image_path,vin_number)
        VALUES ?
    `;
    return await pool.query<ResultSetHeader>(sql, [images]);
}

export async function updateBoughtMercedes(vin_number:string,buyer_email:string) {
    const sql: string = `
        UPDATE mercedes 
        SET email = ?
        WHERE vin_number = ?
    `;
    return await pool.query<ResultSetHeader>(sql, [buyer_email,vin_number]);
}

export async function getBranchAndMercedesCount() {
    const sql: string = `
    select b.branch_name,count(b.branch_name) as count
    from branch b
    left outer join mercedes m 
    on b.branch_id = m.branch_id
    where m.email is null
    group by b.branch_name
    `;
    return await pool.query<RowDataPacket[]>(sql, []);
}

export async function getModelAndCount() {
    const sql: string = `
    select m.model,count(m.model) as count
    from mercedes m
    where m.email is null
    group by m.model
    `;
    return await pool.query<RowDataPacket[]>(sql, []);
}

export async function getBranchAndSaleCount() {
    const sql: string = `
    select b.branch_name,count(b.branch_name) as count
    from branch b
    left outer join mercedes m 
    on b.branch_id = m.branch_id
    where m.email is not null
    group by b.branch_name
    `;
    return await pool.query<RowDataPacket[]>(sql, []);
}

export async function getModelAndSaleCount() {
    const sql: string = `
    select m.model,count(m.model) as count
    from mercedes m
    where m.email is not null
    group by m.model
    `;
    return await pool.query<RowDataPacket[]>(sql, []);
}

export async function getStatsCount() {
    const sql: string = `
    select "branch" as name,count(*) as count
    from branch
    union all 
    select "mercedes" as name,count(*) as count 
    from mercedes
    union all 
    select "user" as name,count(*) as count 
    from _user where email not in (select email from manager)
    union all 
    select "sale" as name,count(*) as count 
    from mercedes where email is not null
    `;
    return await pool.query<RowDataPacket[]>(sql, []);
}

 
//const mercedes1 = new Mercedes("benz-000-000-046","green","GLA 250 4MATIC SUV",2023,96778.99,"automatic","gas",4,1111,"fwd",null,4,null);
//insertMercedes(mercedes1)
//.then(result => console.log(result));

// 

// Delete mercesdes: ResultSetHeader

// Truncate: use ResultSetHeader