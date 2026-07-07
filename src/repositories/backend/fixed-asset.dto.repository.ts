import { FixedAssetDto } from "@/dtos";
import { prisma } from "@/lib/prisma";

export class FixedAssetRepository {
    async getAll(): Promise<FixedAssetDto[]> {
        const fixedAssets = await prisma.fixedAsset.findMany({
            where: {
                status: true
            },
            include: {
                department: true,
                assetType: true
            },
            orderBy: {
                id: "desc"
            }
        });

        return fixedAssets;
    }

    async getById(id: number): Promise<FixedAssetDto | null> {
        return prisma.fixedAsset.findUnique({
            where: { id },
            include: {
                department: true,
                assetType: true
            }
        });
    }

    async create(fixedAsset: FixedAssetDto): Promise<FixedAssetDto> {

        const { id, department, assetType, ...data } = fixedAsset;

        return prisma.fixedAsset.create({
            data: {
                ...data,
                departmentId: data.departmentId!,
                assetTypeId: data.assetTypeId!,
                purchaseValue: data.purchaseValue!,
                accumulatedDepreciation: data.accumulatedDepreciation!,
                registrationDate: data.registrationDate!
            },
        });
    }

    async update(fixedAsset: FixedAssetDto): Promise<FixedAssetDto> {

        const { department, assetType, ...data } = fixedAsset;

        return prisma.fixedAsset.update({
            where: { id: fixedAsset.id },
            data,
        });
    }

    async delete(id: number): Promise<FixedAssetDto> {
        return prisma.fixedAsset.update({
            where: { id },
            data: { status: false },
        });
    }
}