import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const GET = apiHandler(async (req: NextRequest) => {
    const employees = await service.getAll();

    return NextResponse.json(employees);
})