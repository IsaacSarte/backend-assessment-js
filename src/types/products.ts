export type AddedProduct = {
    product_id: number
    title: string
    tags: string
    created_at: string
    updated_at: string
    sku: string
}

export type Variant = {
    product_id: number
    title: string
    created_at: string
    updated_at: string
    sku: string
}

export type Product = {
    title: string
    tags: string
    variants: Variant[]
}

export type Products = {
    products: Product[]
}