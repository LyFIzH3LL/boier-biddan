import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    schema: "./config/schema.tsx",
    dialect: 'postgresql',
    dbCredentials:
    {
        url: 'postgresql://neondb_owner:npg_BLM6aRiCwl5b@ep-jolly-dream-a1asayko-pooler.ap-southeast-1.aws.neon.tech/boier-biddan?sslmode=require'
    },
    verbose: true,
    strict: true,
})