import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const GET = apiHandler(async (req: NextRequest) => {
    const assetTypes = await service.getAll();

    return NextResponse.json(assetTypes);
})