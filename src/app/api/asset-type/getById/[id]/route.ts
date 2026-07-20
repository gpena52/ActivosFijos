import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const GET = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/asset-type/getById/[id]">) => {

    const { id } = await context.params;
    const assetType = await service.getById(Number(id));

    return NextResponse.json(assetType);
}))