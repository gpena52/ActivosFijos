import type { PersonType } from "@/generated/prisma/client";

export interface EmployeeDto {
    id?: number;
    name: string;
    nationalId: string;
    departmentId: undefined;
    personType?: PersonType;
    hireDate?: Date;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
