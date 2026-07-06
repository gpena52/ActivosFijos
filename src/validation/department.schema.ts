import { z } from "zod";

export const createDepartmentSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
})

export const updateDepartmentSchema = createDepartmentSchema.extend({
    id: z.number()
})