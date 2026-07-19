import { z } from "zod";

export const loginSchema = z.object({
    email: z.email(),
    password: z.string()
});

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});