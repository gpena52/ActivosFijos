import { Prisma } from "@/generated/prisma";
import { ApiError } from "./apiError";

type Handler<T = unknown> = (
    req: Request,
    context: T
) => Promise<Response>;

export function apiHandler<T>(handler: Handler<T>): Handler<T> {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error: any) {
            if (error instanceof ApiError) {
                return Response.json(
                    { message: error.message },
                    { status: error.status }
                );
            }

            if (error?.code === 'P2002') {
                return Response.json(
                    { message: "Resource already exists" },
                    { status: 409 }
                );
            }

            return Response.json(
                { message: "Internal Server Error" },
                { status: 400 }
            );
        }
    };
}