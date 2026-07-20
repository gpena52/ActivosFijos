import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const fixedAssets = await service.getAll();

    return NextResponse.json(fixedAssets);
}))