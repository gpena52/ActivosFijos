import { EmployeeService } from "@/services/backend/employee.service";

const service = new EmployeeService();

export async function POST(request: Request) {

    try {
        const employee = await request.json();
        console.log(employee);
        const created = await service.create(employee);

        return Response.json({
            ok: true,
            data: created
        });

    } catch (error: any) {

        console.error("ERROR CREATE EMPLOYEE:", error);

        return Response.json(
            {
                ok: false,
                message: error.message || "Error interno del servidor"
            },
            { status: 500 }
        );
    }
}