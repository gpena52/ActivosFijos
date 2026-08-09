import { DepreciationRecordDto } from "@/dtos";
import { prisma } from "@/lib/prisma";

export class DepreciationRecordRepository {
    async getAllByDateRange(startDate: Date, endDate: Date): Promise<DepreciationRecordDto[]> {
        const depreciationRecords = await prisma.depreciationRecord.findMany({
            include: {
                fixedAsset: {
                    include: {
                        assetType: {
                            include: {
                                purchaseAccount: true,
                                depreciationAccount: true
                            }
                        }
                    }
                }
            },
            where: {
                processDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        const depreciationRecordsDto: DepreciationRecordDto[] = depreciationRecords.map(depreciationRecord => {
            return {
                ...depreciationRecord,
                depreciatedAmount: Number(depreciationRecord.depreciatedAmount),
                accumulatedDepreciation: Number(depreciationRecord.accumulatedDepreciation),
                processDate: new Date(depreciationRecord.processDate),
                createdAt: new Date(depreciationRecord.createdAt),
                updatedAt: depreciationRecord.updatedAt,
                fixedAsset: depreciationRecord.fixedAsset
            };
        });

        return depreciationRecordsDto;
    }
}