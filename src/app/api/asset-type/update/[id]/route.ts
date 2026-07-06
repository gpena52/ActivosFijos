import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const PUT = apiHandler(async (req: NextRequest, context: RouteContext<"/api/asset-type/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const assetType = await service.update({ id: Number(id), ...body });

    return NextResponse.json(assetType);
})