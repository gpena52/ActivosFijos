import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const DELETE = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/employee/delete/[id]">) => {

    const { id } = await context.params;
    const employee = await service.delete(Number(id));

    return NextResponse.json(employee);
}))