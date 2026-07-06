import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const DELETE = apiHandler(async (req: NextRequest, context: RouteContext<"/api/asset-type/delete/[id]">) => {

    const { id } = await context.params;
    const assetType = await service.delete(Number(id));

    return NextResponse.json(assetType);
})