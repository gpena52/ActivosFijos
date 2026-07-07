import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const GET = apiHandler(async (req: NextRequest, context: RouteContext<"/api/asset-type/getById/[id]">) => {

    const { id } = await context.params;
    const assetType = await service.getById(Number(id));

    return NextResponse.json(assetType);
})