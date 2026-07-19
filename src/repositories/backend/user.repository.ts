import { CreateUserDto, LoggedDto, LoginDto, UserDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { Role } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { hash, verify } from "@/utils/password";

export class UserRepository {
    async login(user: LoginDto): Promise<LoggedDto> {
        const userLogin = await prisma.user.findUnique({ where: { email: user.email } });

        if (!userLogin) {
            throw new ApiError(401, "Usuario no existente");
        }

        const isPassowrdValid = await verify(user.password, userLogin.passwordHash);

        if (!isPassowrdValid) {
            throw new ApiError(401, "Usuario invalido");
        }

        return {
            id: userLogin.id.toString(),
            email: userLogin.email,
            firstName: userLogin.firstName,
            lastName: userLogin.lastName,
            role: userLogin.role,
        } as LoggedDto
    }

    async create(user: CreateUserDto): Promise<LoggedDto> {

        const passwordHash = await hash(user.password);
        const { password, ...data } = user;

        let userDb = await prisma.user.create({
            data: {
                ...data, passwordHash, role: Role.USER
            }
        });

        return {
            ...userDb,
            id: userDb.id.toString()
        }
    }
}