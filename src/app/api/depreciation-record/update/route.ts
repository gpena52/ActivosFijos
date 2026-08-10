import { apiHandler } from "@/errors/apiHandler";
import { DepreciationRecordService } from "@/services/backend/depreciation-record.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DepreciationRecordService();

export const PUT = withAuth(apiHandler(async (req: NextRequest) => {

    const body = await req.json();
    const depreciationRecords = await service.update(body);

    return NextResponse.json(depreciationRecords);
}))