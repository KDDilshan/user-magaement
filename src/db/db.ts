import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';

export const connection=await mysql.createConnection({
    host:"127.0.0.1",
    user:"root",
    password:"kavindu123/*-",
    database:"dating",
})

export const db=drizzle(connection,{schema,mode:'default'})