import { apiHandler } from "@/errors/apiHandler";
import { UserService } from "@/services/backend/user.service";
import { NextRequest, NextResponse } from "next/server";

const service = new UserService();

export const POST = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const user = await service.create(body);

    return NextResponse.json(user, { status: 201 });
})