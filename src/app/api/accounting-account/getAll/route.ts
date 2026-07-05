import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";

const service = new AccountingAccountService();

export const GET = apiHandler(async () => {
    const accountingAccounts = await service.getAll();

    return Response.json(accountingAccounts);
})
