import type { Config } from 'drizzle-kit';

export default{
    schema:"./src/db/schema.ts",
    out:"./src/drizzle",
    driver:"mysql2",
    dbCredentials:{
        host:"127.0.0.1",
        user:"root",
        password:"kavindu123/*-",
        database:"dating"
    }
}satisfies Config
