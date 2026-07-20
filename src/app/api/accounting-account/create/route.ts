import { apiHandler } from "@/errors/apiHandler";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AccountingAccountService();

export const POST = withAuth(apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const accountingAccount = await service.create(body);

    return NextResponse.json(accountingAccount, { status: 201 });
}))
