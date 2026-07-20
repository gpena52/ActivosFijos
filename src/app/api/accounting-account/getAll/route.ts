import { apiHandler } from "@/errors/apiHandler";
import { AccountType } from "@/generated/prisma/enums";
import { AccountingAccountService } from "@/services/backend/accounting-account.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AccountingAccountService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;

    const accountTypes = searchParams.getAll("accountType") as AccountType[];

    const accountingAccounts = await service.getAll(accountTypes);

    return NextResponse.json(accountingAccounts);
}))