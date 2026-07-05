import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";

const service = new AccountingAccountService();

export const POST = apiHandler(async (req: Request) => {
    const body = await req.json();
    const accountingAccount = await service.create(body);

    return Response.json(accountingAccount);
})
