import { AccountType } from "@/generated/prisma/enums";
import { z } from "zod";

export const createAccountingAccountSchema = z.object({
    accountNumber: z.string(),
    accountName: z.string(),
    accountType: z.enum(Object.values(AccountType)),
})

export const updateAccountingAccountSchema = createAccountingAccountSchema.extend({
    id: z.number()
})
