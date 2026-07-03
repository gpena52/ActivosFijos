import { DepartmentDto } from "@/dtos/department.dto";
import { prisma } from "@/lib/prisma";

export class DepartmentRepository {
    async getAll(): Promise<DepartmentDto[]> {
        const departments: DepartmentDto[] = await prisma.department.findMany();
        return departments;
    }

    async getById(id: number) {
        return prisma.department.findUnique({
            where: { id },
        });
    }

    async create(name: string) {
        return prisma.department.create({
            data: { name },
        });
    }

    async update(id: number, name: string) {
        return prisma.department.update({
            where: { id },
            data: { name },
        });
    }

    async delete(id: number) {
        return prisma.department.delete({
            where: { id },
        });
    }
}