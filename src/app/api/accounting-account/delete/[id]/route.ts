import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";

const service = new AccountingAccountService();

export const DELETE = apiHandler(async (req: Request, context: RouteContext<"/api/accounting-account/delete/[id]">) => {

    const { id } = await context.params;
    const accountingAccount = await service.delete(Number(id));

    return Response.json(accountingAccount);
})
