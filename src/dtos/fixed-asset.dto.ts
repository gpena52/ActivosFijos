import type { AssetType, Department, Prisma } from "@/generated/prisma/client";

export interface FixedAssetDto {
    id?: number;
    name: string;
    description: string | null;
    departmentId?: number;
    assetTypeId?: number;
    registrationDate?: Date;
    purchaseValue?: Prisma.Decimal;
    accumulatedDepreciation?: Prisma.Decimal;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    department?: Department;
    assetType?: AssetType;
}
