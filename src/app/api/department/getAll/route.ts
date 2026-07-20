import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const departments = await service.getAll();

    return NextResponse.json(departments);
}))