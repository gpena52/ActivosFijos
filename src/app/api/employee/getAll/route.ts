import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const employees = await service.getAll();

    return NextResponse.json(employees);
}))