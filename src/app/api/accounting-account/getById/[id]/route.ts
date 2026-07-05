import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";

const service = new AccountingAccountService();

export const GET = apiHandler(async (req: Request, context: RouteContext<"/api/accounting-account/getById/[id]">) => {

    const { id } = await context.params;
    const accountingAccount = await service.getById(Number(id));

    return Response.json(accountingAccount);
})
