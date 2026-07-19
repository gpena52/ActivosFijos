import { apiHandler } from "@/errors/apiHandler";
import { DashboardService } from "@/services/backend/dashboard.service";
import { NextRequest, NextResponse } from "next/server";

const service = new DashboardService();

export const GET = apiHandler(async (req: NextRequest) => {
    const data = await service.getStatistics();

    return NextResponse.json(data);
})