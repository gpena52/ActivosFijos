import { DepartmentDto } from "@/dtos/department.dto";
import { ApiError } from "@/errors/apiError";
import { prisma } from "@/lib/prisma";

export class DepartmentRepository {
    async getAll(): Promise<DepartmentDto[]> {
        const departments = await prisma.department.findMany({
            where: {
                status: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return departments;
    }

    async getById(id: number): Promise<DepartmentDto | null> {
        return prisma.department.findUnique({
            where: { id },
        });
    }

    async create(department: DepartmentDto): Promise<DepartmentDto> {
        return prisma.department.create({
            data: department,
        });
    }

    async update(department: DepartmentDto): Promise<DepartmentDto> {
        return prisma.department.update({
            where: { id: department.id },
            data: department,
        });
    }

    async delete(id: number): Promise<DepartmentDto> {
        const department = await prisma.department.findUnique({
            where: { id },
            include: {
                assets: {
                    where: {
                        status: true
                    }
                },
                employees: {
                    where: {
                        status: true
                    }
                }
            }
        });

        if ((department?.assets.length ?? 0) > 0) {
            throw new ApiError(400, "Este departamento tiene activos fijos asociados, no puede ser eliminado");
        }

        if ((department?.employees.length ?? 0) > 0) {
            throw new ApiError(400, "Este departamento tiene empleados asociados, no puede ser eliminado");
        }

        return prisma.department.update({
            where: { id },
            data: { status: false },
        });
    }
}