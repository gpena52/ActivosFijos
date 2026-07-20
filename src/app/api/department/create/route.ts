import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const POST = withAuth(apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const department = await service.create(body);

    return NextResponse.json(department, { status: 201 });
}))