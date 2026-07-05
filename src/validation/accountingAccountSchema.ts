import { z } from "zod";

export const createAccountingAccountSchema = z.object({
    accountNumber: z.string(),
    accountName: z.string(),
    accountType: z.enum(["ASSET", "LIABILITY", "EQUITY", "REVENUE", "EXPENSE"]),
})

export const updateAccountingAccountSchema = createAccountingAccountSchema.extend({
    id: z.number()
})
