import { apiHandler } from "@/errors/apiHandler";
import { FixedAssetService } from "@/services/backend/fixed-asset.service";
import { NextRequest, NextResponse } from "next/server";

const service = new FixedAssetService();

export const POST = apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const fixedAsset = await service.create(body);

    return NextResponse.json(fixedAsset, { status: 201 });
})