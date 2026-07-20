import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AccountingAccountService();

export const GET = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/accounting-account/getById/[id]">) => {

    const { id } = await context.params;
    const accountingAccount = await service.getById(Number(id));

    return NextResponse.json(accountingAccount);
}))
