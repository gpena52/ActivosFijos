import { Prisma } from "@/generated/prisma/client";
import { z } from "zod";

const prismaDecimalValidation = (value: number) => {
    try {
        new Prisma.Decimal(value);
        return true;
    } catch {
        return false;
    }
}

const prismaDecimalErrorMessage = {
    message: "Invalid decimal"
}

export const createFixedAssetSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    departmentId: z.number(),
    assetTypeId: z.number(),
    registrationDate: z.date(),
    purchaseValue: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage),
    accumulatedDepreciation: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage)
})

export const updateFixedAssetSchema = createFixedAssetSchema.extend({
    id: z.number()
})
