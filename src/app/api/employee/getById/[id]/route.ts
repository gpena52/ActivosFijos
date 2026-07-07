import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const GET = apiHandler(async (req: NextRequest, context: RouteContext<"/api/employee/getById/[id]">) => {

    const { id } = await context.params;
    const employee = await service.getById(Number(id));

    return NextResponse.json(employee);
})