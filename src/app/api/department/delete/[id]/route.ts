import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const DELETE = apiHandler(async (req: NextRequest, context: RouteContext<"/api/department/delete/[id]">) => {

    const { id } = await context.params;
    const department = await service.delete(Number(id));

    return NextResponse.json(department);
})