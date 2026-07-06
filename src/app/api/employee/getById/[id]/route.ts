import { EmployeeService } from "@/services/backend/employee.service";

const service = new EmployeeService();

type Params = Promise<{
    id: string;
}>;

export async function GET(
    _: Request,
    { params }: { params: Params }
) {
    const { id } = await params;

    const employee = await service.getById(Number(id));

    return Response.json(employee);
}