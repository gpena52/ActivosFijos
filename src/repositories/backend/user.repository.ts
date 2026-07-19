import { CreateUserDto, LoggedDto, UserDto } from "@/dtos";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { hash } from "@/utils/password";

export class UserRepository {
    async create(user: CreateUserDto): Promise<LoggedDto> {

        const passwordHash = await hash(user.password);
        const { password, ...data } = user;

        return prisma.user.create({
            data: {
                ...data, passwordHash, role: Role.USER
            }
        });
    }
}