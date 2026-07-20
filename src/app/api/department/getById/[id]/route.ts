import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DepartmentService();

export const GET = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/department/getById/[id]">) => {

    const { id } = await context.params;
    const department = await service.getById(Number(id));

    return NextResponse.json(department);
}))