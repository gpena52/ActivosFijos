import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AccountingAccountService();

export const PUT = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/accounting-account/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const accountingAccount = await service.update({ id: Number(id), ...body });

    return NextResponse.json(accountingAccount);
}))