import { int, mysqlEnum, mysqlSchema, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";


const users=mysqlTable("users",{
    id:serial("id").primaryKey(),
    name:varchar("name",{length:256}),
    age:int("age"),
    password:varchar("password",{length:256}),
    email:varchar("email",{length:256}),
    gender:mysqlEnum('gender',['male','female'])
})