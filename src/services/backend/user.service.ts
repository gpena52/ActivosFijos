import { CreateUserDto, LoggedDto, LoginDto, UserDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { UserRepository } from "@/repositories/backend/user.repository";
import { createUserSchema, loginSchema } from "@/validation/user.schema";

const repository = new UserRepository();

export class UserService {
    async login(user: LoginDto): Promise<LoggedDto> {

        const validated = loginSchema.safeParse(user);

        if (!validated.success)
            throw new ApiError(400, validated.error.message);

        return repository.login(user);
    }

    async create(user: CreateUserDto): Promise<UserDto> {

        const validated = createUserSchema.safeParse(user);

        if (!validated.success)
            throw new ApiError(400, validated.error.message);

        return repository.create(user);
    }
}