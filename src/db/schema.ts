import { int, mysqlEnum, mysqlSchema, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";


export const users=mysqlTable("users",{
    userId:serial("userId").primaryKey(),
    userName:varchar("userName",{length:256}),
    age:int("age"),
    password:varchar("password",{length:256}),
    email:varchar("email",{length:256}),
    gender:mysqlEnum('gender',['male','female'])
})