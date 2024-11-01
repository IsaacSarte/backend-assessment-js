import { pgTable, serial, bigint, text, date } from "drizzle-orm/pg-core"

export const productSchema = pgTable("products", {
    id: serial("id").primaryKey(),
    product_id: bigint({ mode: 'number' }),
    title: text("title"),
    tags: text("tags"),
    created_at: date("created_at"),
    updated_at: date("updated_at"),
    sku: text("sku")
})