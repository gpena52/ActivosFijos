import { DepartmentDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { DepartmentRepository } from "@/repositories/backend/department.repository";
import { createDepartmentSchema, updateDepartmentSchema } from "@/validation/departmentSchema";

const repository = new DepartmentRepository();

export class DepartmentService {

    async getAll() {
        return repository.getAll();
    }

    async getById(id: number) {
        return repository.getById(id);
    }

    async create(department: DepartmentDto) {
        const validated = createDepartmentSchema.safeParse(department);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        department.updatedAt = null;

        return repository.create(department);
    }

    async update(department: DepartmentDto) {
        const validated = updateDepartmentSchema.safeParse(department);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        return repository.update(department);
    }

    async delete(id: number) {
        return repository.delete(id);
    }
}