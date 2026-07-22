import { AssetTypeDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { prisma } from "@/lib/prisma";

export class AssetTypeRepository {
    async getAll(): Promise<AssetTypeDto[]> {
        const assetTypes = await prisma.assetType.findMany({
            where: {
                status: true
            },
            include: {
                purchaseAccount: true,
                depreciationAccount: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return assetTypes;
    }

    async getById(id: number): Promise<AssetTypeDto | null> {
        return prisma.assetType.findUnique({
            where: { id },
            include: {
                purchaseAccount: true,
                depreciationAccount: true
            }
        });
    }

    async create(assetType: AssetTypeDto): Promise<AssetTypeDto> {

        const { id, purchaseAccount, depreciationAccount, ...data } = assetType;

        return prisma.assetType.create({
            data: { ...data, purchaseAccountId: data.purchaseAccountId!, depreciationAccountId: data.depreciationAccountId! },
        });
    }

    async update(assetType: AssetTypeDto): Promise<AssetTypeDto> {

        const { purchaseAccount, depreciationAccount, ...data } = assetType;

        return prisma.assetType.update({
            where: { id: assetType.id },
            data,
        });
    }

    async delete(id: number): Promise<AssetTypeDto> {
        const assetType = await prisma.assetType.findUnique({
            where: { id },
            include: {
                assets: {
                    where: {
                        status: true
                    }
                }
            }
        });

        if ((assetType?.assets.length ?? 0) > 0) {
            throw new ApiError(400, "Este tipo de activo tiene activos fijos asociados, no puede ser eliminado");
        }

        return prisma.assetType.update({
            where: { id },
            data: { status: false },
        });
    }
}