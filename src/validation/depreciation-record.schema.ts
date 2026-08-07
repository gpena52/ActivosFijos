import { prismaDecimalErrorMessage, prismaDecimalValidation } from "@/utils/prismaDecimalValidation";
import { z } from "zod";

export const createDepreciationRecordSchema = z.object({
    processDate: z.date(),
    depreciatedAmount: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage),
    accumulatedDepreciation: z.number().refine(prismaDecimalValidation, prismaDecimalErrorMessage)
})