import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: 'postgresql://neondb_owner:Q3eITOrsqYx9@ep-icy-wildflower-a1j1pujb.ap-southeast-1.aws.neon.tech/neondb?sslmode=require',
  },
});
