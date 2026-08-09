import { ApiError } from "@/errors/apiError";
import { apiHandler } from "@/errors/apiHandler";
import { DepreciationRecordService } from "@/services/backend/depreciation-record.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DepreciationRecordService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {

    const searchParams = req.nextUrl.searchParams;

    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!startDate || !endDate) {
        throw new ApiError(400, "Las fecha de inicio y fin son requeridas");
    }

    const depreciationRecords = await service.getAllByDateRange(new Date(startDate), new Date(endDate));

    return NextResponse.json(depreciationRecords);
}))