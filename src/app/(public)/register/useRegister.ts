import { CreateUserDto, LoggedDto, UserDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { signIn } from "next-auth/react";
import { useState } from "react";

const route = "/api/user"

export default function useRegister() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const createAndLogin = async (user: CreateUserDto) => {
        setIsLoading(true);
        const response = await fetcher<UserDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(user)
        });

        setIsLoading(false);

        await handleMutationResponse(response, user);
    }

    const handleMutationResponse = async (
        response: ErrorResponseDto<UserDto>,
        user: CreateUserDto
    ) => {
        if (!response.ok && response.code === 409) {

            notify.error(
                "Error",
                `Ya existe un usuario con el correo ${user.email}`
            );

            return;
        } else if (!response.ok) {

            notify.error(
                "Error",
                response.errorMessage
            );

            return;
        }

        await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirectTo: "/dashboard",
        });
    };

    return {
        createAndLogin
    }
}