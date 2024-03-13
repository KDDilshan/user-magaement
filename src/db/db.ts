import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';

export const connection=await mysql.createConnection({
    host:"monorail.proxy.rlwy.net",
    user:"root",
    password:"xxYGoJdIUDscUjTZaJlyEYXOJUxFqhGt",
    database:"railway",
    port:40738
})

export const db=drizzle(connection,{schema,mode:'default'})