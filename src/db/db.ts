import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';

export const connection=await mysql.createConnection({
    host:"monorail.proxy.rlwy.net",
    user:"root",
    password:"fjirvXOaOChgGFEkRizSiOwsPMznGsMO",
    database:"railway",
    port:51272
})

export const db=drizzle(connection,{schema,mode:'default'})