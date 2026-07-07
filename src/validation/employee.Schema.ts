import { z } from "zod";

export const createEmployeeSchema = z.object({
    name: z.string().min(1),
    nationalId: z.string().min(1),
    departmentId: z.number(),
    personType: z.enum(["INDIVIDUAL", "COMPANY"]),
    hireDate: z.date(),
    status: z.boolean()
});

export const updateEmployeeSchema = createEmployeeSchema.extend({
    id: z.number()
});