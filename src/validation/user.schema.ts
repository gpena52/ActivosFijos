import { z } from "zod";

export const createUserSchema = z.object({
    email: z.email(),
    password: z.string(),
    firstName: z.string(),
    lastName: z.string(),
});