import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon('postgresql://neondb_owner:Q3eITOrsqYx9@ep-icy-wildflower-a1j1pujb.ap-southeast-1.aws.neon.tech/neondb?sslmode=require');

export const db = drizzle(sql);