import { authOptions } from "@/auth/config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export async function requireAuth() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return session;
}

export async function notRequireAuth() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/dashboard");
    }
}