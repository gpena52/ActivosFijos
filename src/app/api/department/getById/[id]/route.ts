import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export const GET = apiHandler(async (req: Request, context: RouteContext<"/api/department/getById/[id]">) => {

    const { id } = await context.params;
    const department = await service.getById(Number(id));

    return Response.json(department);
})