import { migrate } from "drizzle-orm/mysql2/migrator"
import { connection, db } from "./db"


async function runMigrations() {
    try {
        await migrate(db,{migrationsFolder:"./src/drizzle"})
        console.log("Migratiosn appliyed sucessfully")
    } catch (error) {
        console.log('error appline migrations')
    }finally{
        await connection.end()
    }
}

runMigrations()