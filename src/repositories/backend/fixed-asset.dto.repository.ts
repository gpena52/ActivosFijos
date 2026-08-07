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
                assetType: true,
                depreciationRecords: true
            },
            orderBy: {
                id: "desc"
            }
        });

        const fixedAssetsDto: FixedAssetDto[] = fixedAssets.map(fixedAsset => {
            return {
                ...fixedAsset,
                depreciationRecords: fixedAsset.depreciationRecords?.map(depreciationRecord => {
                    return {
                        ...depreciationRecord,
                        depreciatedAmount: Number(depreciationRecord.depreciatedAmount),
                        accumulatedDepreciation: Number(depreciationRecord.accumulatedDepreciation),
                        processDate: new Date(depreciationRecord.processDate),
                        createdAt: new Date(depreciationRecord.createdAt),
                        updatedAt: depreciationRecord.updatedAt
                    };
                }) ?? []
            };
        });

        return fixedAssetsDto;
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
                registrationDate: data.registrationDate!,
                depreciationRecords: {
                    create: data.depreciationRecords?.map((depreciationRecord) => {
                        return {
                            processDate: depreciationRecord.processDate,
                            depreciatedAmount: depreciationRecord.depreciatedAmount,
                            accumulatedDepreciation: depreciationRecord.accumulatedDepreciation,
                            createdAt: depreciationRecord.createdAt,
                            updatedAt: depreciationRecord.updatedAt
                        };
                    }),
                }
            },
        });
    }

    async update(fixedAsset: FixedAssetDto): Promise<FixedAssetDto> {

        await prisma.depreciationRecord.deleteMany({
            where: { fixedAssetId: fixedAsset.id }
        })

        const { department, assetType, ...data } = fixedAsset;

        return prisma.fixedAsset.update({
            where: { id: fixedAsset.id },
            data: {
                ...data,
                depreciationRecords: {
                    create: data.depreciationRecords?.map((depreciationRecord) => {
                        return {
                            processDate: depreciationRecord.processDate,
                            depreciatedAmount: depreciationRecord.depreciatedAmount,
                            accumulatedDepreciation: depreciationRecord.accumulatedDepreciation,
                            createdAt: depreciationRecord.createdAt,
                            updatedAt: depreciationRecord.updatedAt
                        };
                    }),
                }
            },
        });
    }

    async delete(id: number): Promise<FixedAssetDto> {
        return prisma.fixedAsset.update({
            where: { id },
            data: { status: false },
        });
    }
}