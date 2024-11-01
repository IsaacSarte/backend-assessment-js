import { getProducts, addProduct, editProduct, deleteProduct } from "../actions/products";

// handle products request methods that is not delete
export const handleProductsRequest = async (request: Request): Promise<Response> => {
    if (request.method === "GET") {
        try {
            const data = await getProducts();

            console.log("data: ", data);

            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response("Error fetching products", { status: 500 });
        }
    }

    if (request.method === "POST") {
        try {
            const data = await addProduct();

            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response("Error adding products", { status: 500 });
        }
    }

    if (request.method === "PUT") {
        try {
            const data = await editProduct();

            return new Response(JSON.stringify(data), {
                headers: { "Content-Type": "application/json" },
            });
        } catch (error) {
            return new Response("Error editing product", { status: 500 });
        }
    }

    return new Response("Method Not Allowed", { status: 405 });
}

// handle delete product request
export const handleDeleteProductRequest = async (id: number): Promise<Response> => {
    if (!id) {
        return new Response("Product ID is required", { status: 400 });
    }
  
    try {
        await deleteProduct(id);
        return new Response("Product deleted successfully", {
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error deleting product:", error);
        return new Response("Error deleting product", { status: 500 });
    }
};