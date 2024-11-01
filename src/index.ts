/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

const createCorsHeaders = () => {
    return new Headers({
        "Access-Control-Allow-Origin": "*", // Adjust this to restrict origins, e.g., "https://yourdomain.com"
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
}
  
const handlePreflight = (request: Request): Response => {
    const headers = createCorsHeaders();
    return new Response(null, { headers });
}

import { handleDeleteProductRequest, handleProductsRequest } from "./routes/products";
import { Env } from "./types/env";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

        if (request.method === "OPTIONS") {
			return handlePreflight(request);
		}

        const headers = createCorsHeaders();

        try {
			let response;
			if (url.pathname === "/api/products" && request.method === "GET") {
				response = await handleProductsRequest(request);
			} else if (url.pathname === "/api/products" && request.method === "POST") {
				response = await handleProductsRequest(request);
			} else if (url.pathname === "/api/products" && request.method === "PUT") {
				response = await handleProductsRequest(request);
			} else if (url.pathname.startsWith("/api/products/") && request.method === "DELETE") {
				const id = url.pathname.split("/")[3];
				response = await handleDeleteProductRequest(Number(id));
			} else {
				response = new Response("Not Found", { status: 404 });
			}

			// Add CORS headers to the response
			response.headers.set("Access-Control-Allow-Origin", headers.get("Access-Control-Allow-Origin")!);
			response.headers.set("Access-Control-Allow-Methods", headers.get("Access-Control-Allow-Methods")!);
			response.headers.set("Access-Control-Allow-Headers", headers.get("Access-Control-Allow-Headers")!);

			return response;
		} catch (error) {
			return new Response("Internal Server Error", { status: 500, headers });
		}
	},
};