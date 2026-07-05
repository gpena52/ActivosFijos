import { AccountingAccountDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { AccountingAccountRepository } from "@/repositories/backend/accounting-account.repository";
import { createAccountingAccountSchema, updateAccountingAccountSchema } from "@/validation/accountingAccountSchema";

const repository = new AccountingAccountRepository();

export class AccountingAccountService {

    async getAll() {
        return repository.getAll();
    }

    async getById(id: number) {
        return repository.getById(id);
    }

    async create(accountingAccount: AccountingAccountDto) {
        const validated = createAccountingAccountSchema.safeParse(accountingAccount);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        accountingAccount.updatedAt = null;

        return repository.create(accountingAccount);
    }

    async update(accountingAccount: AccountingAccountDto) {
        const validated = updateAccountingAccountSchema.safeParse(accountingAccount);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        return repository.update(accountingAccount);
    }

    async delete(id: number) {
        return repository.delete(id);
    }
}
