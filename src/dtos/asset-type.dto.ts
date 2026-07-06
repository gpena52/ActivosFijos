import { AccountingAccount } from "@/generated/prisma/client";

export interface AssetTypeDto {
    id?: number;
    name: string;
    description: string | null;
    purchaseAccountId?: number;
    depreciationAccountId?: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    purchaseAccount?: AccountingAccount;
    depreciationAccount?: AccountingAccount;
}
