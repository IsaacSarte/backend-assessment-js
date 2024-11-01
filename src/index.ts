/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleDeleteProductRequest, handleProductsRequest } from "./routes/products";
import { Env } from "./types/env";

export default {
	async fetch(
		request: Request,
		env: Env,
		ctx: ExecutionContext
	): Promise<Response> {
		const url = new URL(request.url);

        // get products url
		if (url.pathname === "/api/products") {
			return handleProductsRequest(request);
		}

        // add products url
        if (url.pathname === "/api/products" && request.method === "POST") {
            return handleProductsRequest(request);
        }

        // edit products url
        if (url.pathname === "/api/products" && request.method === "PUT") {
            return handleProductsRequest(request);
        }

        // delete products url
        if (url.pathname.startsWith("/api/products/") && request.method === "DELETE") {
            const id = url.pathname.split("/")[3];
            return handleDeleteProductRequest(Number(id));
        }
		
		return new Response("Not Found", { status: 404 });
	},
};