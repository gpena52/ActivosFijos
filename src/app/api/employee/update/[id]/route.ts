import { EmployeeService } from "@/services/backend/employee.service";

const service = new EmployeeService();

type Params = Promise<{
    id: string;
}>;

export async function PUT(
    request: Request,
    { params }: { params: Params }
) {

    await params;

    const employee = await request.json();

    const updated = await service.update(employee);

    return Response.json(updated);
}