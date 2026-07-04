import type { Prisma } from "@/generated/prisma";

export interface DepreciationRecordDto {
    id?: number;
    processYear: number;
    processMonth: number;
    assetId: number;
    processDate: Date;
    depreciatedAmount: Prisma.Decimal;
    accumulatedDepreciation: Prisma.Decimal;
    purchaseAccountId: number;
    depreciationAccountId: number;
    createdAt: Date;
    updatedAt: Date | null;
}
