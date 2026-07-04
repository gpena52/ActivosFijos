import { ApiError } from "./apiError";

type Handler<T = unknown> = (
    req: Request,
    context: T
) => Promise<Response>;

export function apiHandler<T>(handler: Handler<T>): Handler<T> {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error) {
            if (error instanceof ApiError) {
                return Response.json(
                    { message: error.message },
                    { status: error.status }
                );
            }

            return Response.json(
                { message: "Internal Server Error" },
                { status: 500 }
            );
        }
    };
}