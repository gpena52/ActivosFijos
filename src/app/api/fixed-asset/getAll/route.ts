import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const GET = apiHandler(async (req: NextRequest) => {
    const fixedAssets = await service.getAll();

    return NextResponse.json(fixedAssets);
})