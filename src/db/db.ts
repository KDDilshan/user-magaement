import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

export const connection=await mysql.createConnection({
    host:"monorail.proxy.rlwy.net",
    password:"1-33cHB4f1d456g-fd6144-bBA6cA52d",
    user:"root",
    database:"railway",
    port:52794,
})

export const db=drizzle(connection)