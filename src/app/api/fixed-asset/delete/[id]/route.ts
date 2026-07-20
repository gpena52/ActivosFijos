import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const DELETE = withAuth(apiHandler(async (req: NextRequest, context: RouteContext<"/api/fixed-asset/delete/[id]">) => {

    const { id } = await context.params;
    const fixedAsset = await service.delete(Number(id));

    return NextResponse.json(fixedAsset);
}))