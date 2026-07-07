import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const PUT = apiHandler(async (req: NextRequest, context: RouteContext<"/api/fixed-asset/update/[id]">) => {

    const { id } = await context.params;
    const body = await req.json();
    const fixedAsset = await service.update({ id: Number(id), ...body });

    return NextResponse.json(fixedAsset);
})