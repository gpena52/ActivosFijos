import { prismaDecimalErrorMessage, prismaDecimalValidation } from "@/utils/prismaDecimalValidation";
import { z } from "zod";
import { createDepreciationRecordSchema } from "./depreciation-record.schema";

export const createFixedAssetSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    departmentId: z.number(),
    assetTypeId: z.number(),
    registrationDate: z.date(),
    purchaseValue: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage),
    accumulatedDepreciation: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage),
    depreciationRecords: z.array(createDepreciationRecordSchema)
})

export const updateFixedAssetSchema = createFixedAssetSchema.extend({
    id: z.number()
})
