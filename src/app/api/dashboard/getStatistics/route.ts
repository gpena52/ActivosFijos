import { apiHandler } from "@/errors/apiHandler";
import { DashboardService } from "@/services/backend/dashboard.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new DashboardService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const data = await service.getStatistics();

    return NextResponse.json(data);
}))