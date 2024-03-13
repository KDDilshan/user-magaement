import type { Config } from 'drizzle-kit';

export default{
    schema:"./src/db/schema.ts",
    out:"./src/drizzle",
    driver:"mysql2",
    dbCredentials:{
        host:"monorail.proxy.rlwy.net",
        user:"root",
        password:"xxYGoJdIUDscUjTZaJlyEYXOJUxFqhGt",
        database:"railway",
        port:40738
    }
}satisfies Config
