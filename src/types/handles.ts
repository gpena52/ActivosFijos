import { NextRequest, NextResponse } from "next/server";

export type Handler<T = unknown> = (
    req: NextRequest,
    context: T
) => Promise<NextResponse>;