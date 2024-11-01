import { db } from '../db/database.js';
import { productSchema } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { AddedProduct, Products } from '../types/products.js';

// get products list
export const getProducts = async () => {
    try {
        // get product list
        const products = await db.select().from(productSchema);

        const productList: AddedProduct[] = [];

        const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/get');
        if (!response.ok) {
            return new Error('Failed to fetch data');
        }

        const data = await response.json() as Products;

        // loop throught all products from the response to put it into the database
        data.products.forEach(product => {
            const { title, tags, variants } = product
        
            variants.forEach(variant => {
                const variantID = variant.product_id
                const variantTitle = variant.title
                const variantSKU = variant.sku
                const created_at = variant.created_at
                const updated_at = variant.created_at
        
                productList.push({
                    product_id: variantID,
                    title: (title || "") + " " + (variantTitle || ""),
                    tags: tags || "",
                    created_at: created_at,
                    updated_at: updated_at,
                    sku: variantSKU || ""
                })
            })
        })

        // insert the parsed products into the database
        const insertPromises = productList.map(async product => {
            return await db
            .insert(productSchema)
            .values({
                product_id: product.product_id,
                title: product.title,
                tags: product.tags,
                created_at: product.created_at,
                updated_at: product.updated_at,
                sku: product.sku
            })
            .execute();
        })
        await Promise.all(insertPromises);

        console.log('Successfully added products into the database.');
        const addedProducts = await db.select().from(productSchema);
        return addedProducts;

        // for checking purposes, add a return that says the products are there
        // return new Response('Products are already inserted', { status: 200 });
    } catch (error) {
        return new Error('Failed to get products');
    }
}

// add product
export const addProduct = async () => {
    try {
        let products = await db.select().from(productSchema);

        const productList: AddedProduct[] = [];

        const response = await fetch('https://02557f4d-8f03-405d-a4e7-7a6483d26a04.mock.pstmn.io/getProducts');
        if (!response.ok) {
            return new Error('Failed to fetch data');
        }

        const data = await response.json() as Products;

        // loop throught all products from the response to put it into the database
        data.products.forEach(product => {
            const { title, tags, variants } = product
        
            variants.forEach(variant => {
                const variantID = variant.product_id
                const variantTitle = variant.title
                const variantSKU = variant.sku
                const created_at = variant.created_at
                const updated_at = variant.created_at
        
                productList.push({
                    product_id: variantID,
                    title: (title || "") + " " + (variantTitle || ""),
                    tags: tags || "",
                    created_at: created_at,
                    updated_at: updated_at,
                    sku: variantSKU || ""
                })
            })
        })

        // insert the parsed products into the database
        const insertPromises = productList.map(async product => {
            return await db
            .insert(productSchema)
            .values({
                product_id: product.product_id,
                title: product.title,
                tags: product.tags,
                created_at: product.created_at,
                updated_at: product.updated_at,
                sku: product.sku
            })
            .execute();
        })
        await Promise.all(insertPromises);

        products = await db.select().from(productSchema);

        console.log('Successfully added products into the database.');
        const addedProducts = await db.select().from(productSchema);
        return addedProducts;

        // for checking purposes, add a return that says the products are there
        // return new Response('Products are already inserted', { status: 200 });
    } catch (error) {
        return new Error('Failed to add product');
    }
}

// edit product
export const editProduct = async () => {
    try {
        let products = await db.select().from(productSchema);

        if (!products.length) {
            return new Error('There are no products found');
        }

        products?.map(async product => {
            await db
            .update(productSchema)
            .set({
                title: (product.title ?? '') + ' ' + (product.sku ?? ''),
                updated_at: product.updated_at
            })
            .where(eq(productSchema.id, product.id))
        })

        console.log('Successfully edited product title with sku in it into the database.');
        return new Response('Successfully edited product title with sku in it into the database.', { status: 200 });
    } catch (error) {
        return new Error('Failed to edit products');
    }
}

// delete product
export const deleteProduct = async (id: number) => {
    try {
        const getProduct = 
            await db
            .select()
            .from(productSchema)
            .where(eq(productSchema.id, id))

        if (!getProduct.length) {
            return new Error('Product not found');
        }

        const deleteProduct =
            await db
            .delete(productSchema)
            .where(eq(productSchema.id, id))
            .execute();

        console.log('Successfully deleted product with id: ', id);
        return new Response('Successfully deleted product with id: ' + id, { status: 200 });
    } catch (error) {
        return new Error('Failed to delete product');
    }
}