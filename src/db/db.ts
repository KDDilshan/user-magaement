import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import * as schema from './schema';

export const connection=await mysql.createConnection({
    host:"roundhouse.proxy.rlwy.net",
    user:"root",
    password:"QgvZhNFTwGynVOpsUKtIBWGUIDwIuFgx",
    database:"railway",
    port:41841
})

export const db=drizzle(connection,{schema,mode:'default'})