import { LoggedDto } from "@/dtos";
import { fetcher } from "@/utils/fetcher";
import NextAuth, { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    session: {
        strategy: "jwt",
    },

    pages: {
        signIn: "/login",
    },

    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const response = await fetcher<LoggedDto>(`${process.env.API_URL}/api/user/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                if (!response.ok)
                    return null;

                return response.data as LoggedDto;
            },
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.firstName = user.firstName;
                token.lastName = user.lastName;
                token.role = user.role;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
                session.user.firstName = token.firstName as string;
                session.user.lastName = token.lastName as string;
                session.user.role = token.role as string;
            }

            return session;
        },
    },
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const route = "/api/auth"
                const response = await fetcher<LoggedDto>(`${route}/login`, {
                    method: "POST",
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                if (!response.ok)
                    return null;

                return response.data;
            },
        }),
    ],
});