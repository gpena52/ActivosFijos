import { Role } from "@/generated/prisma/enums";

export interface UserDto {
    id?: number;
    email: string;
    passwordHash: string;
    firstName: string;
    lastName: string;
    role: Role;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
