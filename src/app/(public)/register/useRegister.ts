import { CreateUserDto, LoggedDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useState } from "react";

const route = "/api/user"

export default function useRegister() {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const create = async (user: CreateUserDto) => {
        setIsLoading(true);
        const response = await fetcher<LoggedDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(user)
        });

        setIsLoading(false);

        await handleMutationResponse(response, "Usuario creado con exito", user.email);
    }

    const handleMutationResponse = async (
        response: ErrorResponseDto<LoggedDto>,
        successMessage: string,
        email: string
    ) => {
        if (!response.ok && response.code === 409) {

            notify.error(
                "Error",
                `Ya existe un usuario con el correo ${email}`
            );

            return;
        } else if (!response.ok) {

            notify.error(
                "Error",
                response.message
            );

            return;
        }

        notify.success("Exito", successMessage);
    };

    return {
        create
    }
}