import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const POST = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const assetType = await service.create(body);

    return NextResponse.json(assetType, { status: 201 });
})