import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const GET = apiHandler(async (req: NextRequest, context: RouteContext<"/api/fixed-asset/getById/[id]">) => {

    const { id } = await context.params;
    const fixedAsset = await service.getById(Number(id));

    return NextResponse.json(fixedAsset);
})