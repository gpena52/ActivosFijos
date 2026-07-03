export interface AssetTypeDto {
    id: number;
    description: string | null;
    purchaseAccountId: number;
    depreciationAccountId: number;
    status: boolean;
    createdAt: Date;
    updatedAt: Date | null;
}
