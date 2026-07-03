import { DepartmentRepository } from "@/repositories/backend/department.repository";

const repository = new DepartmentRepository();

export class DepartmentService {
    async getDepartments() {
        return repository.getAll();
    }
}