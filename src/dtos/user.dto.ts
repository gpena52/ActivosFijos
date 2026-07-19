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

export interface CreateUserDto {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

export interface LoginDto {
    email: string;
    password: string;
}

export interface LoggedDto {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: Role;
}