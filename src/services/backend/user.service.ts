import { CreateUserDto, LoggedDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { UserRepository } from "@/repositories/backend/user.repository";
import { createUserSchema } from "@/validation/user.schema";

const repository = new UserRepository();

export class UserService {
    async create(user: CreateUserDto): Promise<LoggedDto> {

        const validated = createUserSchema.safeParse(user);

        if (!validated.success)
            throw new ApiError(400, validated.error.message);

        return repository.create(user);
    }
}