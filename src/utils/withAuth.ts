import { Handler } from "@/types/handles";
import { NextRequest, NextResponse } from "next/server";

async function authenticate(request: Request): Promise<boolean> {
    const token = request.headers.get("X-API-KEY");

    if (!token) {
        return false;
    }

    return true
}

export function withAuth<T>(handler: Handler<T>) {
    return async (request: NextRequest, context: T) => {
        const client = await authenticate(request);

        if (!client) {
            return NextResponse.json(
                { message: "Unauthorized" },
                { status: 401 }
            );
        }

        return handler(request, context);
    };
}