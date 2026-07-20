import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const GET = withAuth(apiHandler(async (req: NextRequest) => {
    const assetTypes = await service.getAll();

    return NextResponse.json(assetTypes);
}))