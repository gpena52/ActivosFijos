import { FixedAssetDto } from "./fixed-asset.dto";

export interface DepreciationRecordDto {
    id?: number;
    fixedAssetId?: number;
    processDate: Date;
    depreciatedAmount: number;
    accumulatedDepreciation: number;
    createdAt?: Date;
    updatedAt?: Date | null;

    fixedAsset?: FixedAssetDto;
}
