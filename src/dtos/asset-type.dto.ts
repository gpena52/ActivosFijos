import { AccountingAccountDto } from "./accounting-account.dto";

export interface AssetTypeDto {
    id?: number;
    name: string;
    description: string | null;
    purchaseAccountId?: number;
    depreciationAccountId?: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
    purchaseAccount?: AccountingAccountDto;
    depreciationAccount?: AccountingAccountDto;
}
