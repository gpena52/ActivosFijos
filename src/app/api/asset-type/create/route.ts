import { apiHandler } from "@/errors/apiHandler";
import { AssetTypeService } from "@/services/backend/asset-type.service";
import { withAuth } from "@/utils/withAuth";
import { NextRequest, NextResponse } from "next/server";

const service = new AssetTypeService();

export const POST = withAuth(apiHandler(async (req: NextRequest) => {
    const body = await req.json();
    const assetType = await service.create(body);

    return NextResponse.json(assetType, { status: 201 });
}))