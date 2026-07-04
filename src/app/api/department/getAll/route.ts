import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export const GET = apiHandler(async () => {
    const departments = await service.getAll();

    return Response.json(departments);
})