"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AuthGuard() {
    const router = useRouter();

    useSession({
        required: true,
        onUnauthenticated() {
            router.replace("/login");
        },
    });

    return null;
}