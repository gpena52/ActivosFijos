import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const GET = apiHandler(async (req: NextRequest) => {
    const departments = await service.getAll();

    return NextResponse.json(departments);
})