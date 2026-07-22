import { AccountingAccountDto } from "@/dtos/accounting-account.dto";
import { ApiError } from "@/errors/apiError";
import { AccountType } from "@/generated/prisma/enums";
import { prisma } from "@/lib/prisma";

export class AccountingAccountRepository {
    async getAll(accountTypes: AccountType[]): Promise<AccountingAccountDto[]> {
        const accountingAccounts = await prisma.accountingAccount.findMany({
            where: {
                status: true,
                ...(accountTypes.length !== 0 && {
                    accountType: {
                        in: accountTypes
                    }
                })
            },
            orderBy: (
                accountTypes.length === 0
                    ? [{ accountType: "asc" }, { accountNumber: "asc" }]
                    : [{ accountNumber: "asc" }]
            )

        });

        return accountingAccounts;
    }

    async getById(id: number): Promise<AccountingAccountDto | null> {
        return prisma.accountingAccount.findUnique({
            where: { id },
        });
    }

    async create(accountingAccount: AccountingAccountDto): Promise<AccountingAccountDto> {
        return prisma.accountingAccount.create({
            data: accountingAccount,
        });
    }

    async update(accountingAccount: AccountingAccountDto): Promise<AccountingAccountDto> {
        return prisma.accountingAccount.update({
            where: { id: accountingAccount.id },
            data: accountingAccount,
        });
    }

    async delete(id: number): Promise<AccountingAccountDto> {
        const accountingAccount = await prisma.accountingAccount.findUnique({
            where: { id },
            include: {
                purchaseAssetTypes: {
                    where: {
                        status: true
                    }
                },
                depreciationAssetTypes: {
                    where: {
                        status: true
                    }
                },
            }
        });

        if ((accountingAccount?.purchaseAssetTypes.length ?? 0) > 0 || (accountingAccount?.depreciationAssetTypes.length ?? 0) > 0) {
            throw new ApiError(400, "Esta cuenta tiene activos asociados, no puede ser eliminada");
        }

        return prisma.accountingAccount.update({
            where: { id },
            data: { status: false },
        });
    }
}
