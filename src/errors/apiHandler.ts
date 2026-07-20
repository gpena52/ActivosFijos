import { Handler } from "@/types/handles";
import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./apiError";

export function apiHandler<T>(handler: Handler<T>): Handler<T> {
    return async (req, context) => {
        try {
            return await handler(req, context);
        } catch (error: any) {

            console.log(error)

            if (error instanceof ApiError) {
                return NextResponse.json(
                    { message: error.message },
                    { status: error.status }
                );
            }

            if (error?.code === 'P2002') {
                return NextResponse.json(
                    { message: "Resource already exists" },
                    { status: 409 }
                );
            }

            return NextResponse.json(
                { message: "Internal Server Error" },
                { status: 400 }
            );
        }
    };
}