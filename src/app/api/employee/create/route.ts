import { apiHandler } from "@/errors/apiHandler";
import { EmployeeService } from "@/services/backend/employee.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new EmployeeService();

export const POST = withAuth(apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const employee = await service.create(body);

    return NextResponse.json(employee, { status: 201 });
}))