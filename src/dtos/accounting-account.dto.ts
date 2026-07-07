import type { AccountType } from "@/generated/prisma/client";

export interface AccountingAccountDto {
    id?: number;
    accountNumber: string;
    accountName: string;
    accountType: AccountType;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
