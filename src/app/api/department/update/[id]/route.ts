import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const PUT = apiHandler(async (req: NextRequest, context: RouteContext<"/api/department/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const department = await service.update({ id: Number(id), ...body });

    return NextResponse.json(department);
})