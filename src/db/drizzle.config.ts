import type { Config } from 'drizzle-kit';

export default{
    schema:"./src/db/schema.ts",
    out:"./src/drizzle",
    driver:"mysql2",
    dbCredentials:{
        host:"roundhouse.proxy.rlwy.net",
        user:"root",
        password:"QgvZhNFTwGynVOpsUKtIBWGUIDwIuFgx",
        database:"railway",
        port:41841
    }
}satisfies Config
