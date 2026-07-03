import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export async function GET() {
    const departments = await service.getDepartments();

    return Response.json(departments);
}