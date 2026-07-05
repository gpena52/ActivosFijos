import { AccountingAccountDto } from "@/dtos/accounting-account.dto";
import { prisma } from "@/lib/prisma";

export class AccountingAccountRepository {
    async getAll(): Promise<AccountingAccountDto[]> {
        const accountingAccounts = await prisma.accountingAccount.findMany({
            where: {
                status: true
            },
            orderBy: {
                accountType: "asc"
            }
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
        return prisma.accountingAccount.update({
            where: { id },
            data: { status: false },
        });
    }
}
