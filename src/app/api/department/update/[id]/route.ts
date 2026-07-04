import { apiHandler } from "@/errors/apiHandler";
import { DepartmentService } from "@/services/backend/department.service";

const service = new DepartmentService();

export const PUT = apiHandler(async (req: Request, context: RouteContext<"/api/department/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const department = await service.update({ id: Number(id), ...body });

    return Response.json(department);
})