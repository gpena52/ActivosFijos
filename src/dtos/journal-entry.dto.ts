import type { MovementType, Prisma } from "@/generated/prisma";

export interface JournalEntryDto {
    id: number;
    description: string | null;
    assetTypeId: number;
    accountId: number;
    movementType: MovementType;
    entryDate: Date;
    amount: Prisma.Decimal;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
