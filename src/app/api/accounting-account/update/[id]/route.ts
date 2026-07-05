import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";

const service = new AccountingAccountService();

export const PUT = apiHandler(async (req: Request, context: RouteContext<"/api/accounting-account/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const accountingAccount = await service.update({ id: Number(id), ...body });

    return Response.json(accountingAccount);
})
