import { EmployeeDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { EmployeeRepository } from "@/repositories/backend/employee.repository";
import {
    createEmployeeSchema,
    updateEmployeeSchema
} from "@/validation/employee.Schema";
import { date } from "zod";

const repository = new EmployeeRepository();

export class EmployeeService {

    async getAll() {
        return repository.getAll();
    }

    async getById(id: number) {
        return repository.getById(id);
    }

    async create(employee: EmployeeDto) {
        employee.hireDate = new Date(employee.hireDate!);

        const validated = createEmployeeSchema.safeParse(employee);

        if (!validated.success)
            throw new ApiError(400, validated.error.message);

        employee.updatedAt = null;

        return repository.create(employee);
    }

    async update(employee: EmployeeDto) {
        employee.hireDate = new Date(employee.hireDate!);
        const validated = updateEmployeeSchema.safeParse(employee);

        if (!validated.success)
            throw new ApiError(400, validated.error.message);

        return repository.update(employee);
    }

    async delete(id: number) {
        return repository.delete(id);
    }

}