import { EmployeeDto } from "@/dtos";
import { prisma } from "@/lib/prisma";

export class EmployeeRepository {

    async getAll(): Promise<EmployeeDto[]> {
        return prisma.employee.findMany({
            where: {
                status: true
            },
            orderBy: {
                name: "asc"
            }
        });
    }

    async getById(id: number): Promise<EmployeeDto | null> {
        return prisma.employee.findUnique({
            where: {
                id
            }
        });
    }

    async create(employee: EmployeeDto): Promise<EmployeeDto> {

        const { id, ...data } = employee

        return prisma.employee.create({
            data: { ...data, departmentId: data.departmentId!, personType: data.personType!, hireDate: data.hireDate! }
        });
    }

    async update(employee: EmployeeDto): Promise<EmployeeDto> {
        return prisma.employee.update({
            where: {
                id: employee.id
            },
            data: employee
        });
    }

    async delete(id: number): Promise<EmployeeDto> {
        return prisma.employee.update({
            where: {
                id
            },
            data: {
                status: false
            }
        });
    }

}