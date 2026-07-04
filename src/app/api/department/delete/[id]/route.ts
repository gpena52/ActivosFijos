import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export const DELETE = apiHandler(async (req: Request, context: RouteContext<"/api/department/delete/[id]">) => {

    const { id } = await context.params;
    const department = await service.delete(Number(id));

    return Response.json(department);
})