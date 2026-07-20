import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const DELETE = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/asset-type/delete/[id]">) => {

    const { id } = await context.params;
    const assetType = await service.delete(Number(id));

    return NextResponse.json(assetType);
}))