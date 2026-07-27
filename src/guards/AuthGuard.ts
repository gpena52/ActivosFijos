// components/AuthGuard.tsx

"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard() {
    const router = useRouter();

    const { status } = useSession({
        required: true,
        onUnauthenticated() {
            router.replace("/login");
        },
    });

    useEffect(() => {
        if (status === "loading") return

        router.replace("/login");
    }, [status, router]);

    return null;
}