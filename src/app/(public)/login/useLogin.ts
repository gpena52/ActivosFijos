import { LoginDto } from "@/dtos";
import { signIn, SignInResponse, signOut } from "next-auth/react";

export default function useLogin() {
    const login = async (user: LoginDto): Promise<SignInResponse | undefined> => {
        const result = await signIn("credentials", {
            email: user.email,
            password: user.password,
            redirect: false,
        });

        // await signOut();

        return result;
    }

    return {
        login
    }
}