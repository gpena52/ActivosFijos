import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const PUT = apiHandler(async (req: NextRequest, context: RouteContext<"/api/employee/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const employee = await service.update({ id: Number(id), ...body });

    return NextResponse.json(employee);
})