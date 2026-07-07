import { EmployeeService } from "@/services/backend/employee.service";

const service = new EmployeeService();

export async function GET() {
    const employees = await service.getAll();

    return Response.json(employees);
}