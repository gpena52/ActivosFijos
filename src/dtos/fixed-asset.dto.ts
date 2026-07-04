import type { Prisma } from "@/generated/prisma";

export interface FixedAssetDto {
    id?: number;
    description: string | null;
    departmentId: number;
    assetTypeId: number;
    registrationDate: Date;
    purchaseValue: Prisma.Decimal;
    accumulatedDepreciation: Prisma.Decimal;
    createdAt: Date;
    updatedAt: Date | null;
}
