import type { Config } from 'drizzle-kit';

export default{
    schema:"./src/db/schema.ts",
    out:"./src/drizzle",
    driver:"mysql2",
    dbCredentials:{
        host:"monorail.proxy.rlwy.net",
        user:"root",
        password:"fjirvXOaOChgGFEkRizSiOwsPMznGsMO",
        database:"railway",
        port:51272
    }
}satisfies Config
