import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export const POST = apiHandler(async (req: Request) => {
    const body = await req.json();
    const department = await service.create(body);

    return Response.json(department);
})