import { z } from "zod";

export const createAssetTypeSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    purchaseAccountId: z.number(),
    depreciationAccountId: z.number(),
})

export const updateAssetTypeSchema = createAssetTypeSchema.extend({
    id: z.number()
})