import { AccountingAccountDto, FixedAssetDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { Prisma } from "@/generated/prisma/client";
import { FixedAssetRepository } from "@/repositories/backend/fixed-asset.dto.repository";
import { createFixedAssetSchema, updateFixedAssetSchema } from "@/validation/fixedAsset.schema";

const repository = new FixedAssetRepository();

export class FixedAssetService {

    async getAll() {
        return repository.getAll();
    }

    async getById(id: number) {
        return repository.getById(id);
    }

    async create(fixedAsset: FixedAssetDto) {
        this.updateValues(fixedAsset);

        const validated = createFixedAssetSchema.safeParse(fixedAsset);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        fixedAsset.updatedAt = null;

        return repository.create(fixedAsset);
    }

    async update(fixedAsset: FixedAssetDto) {
        this.updateValues(fixedAsset);

        const validated = updateFixedAssetSchema.safeParse(fixedAsset);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        return repository.update(fixedAsset);
    }

    async delete(id: number) {
        return repository.delete(id);
    }

    updateValues(fixedAsset: FixedAssetDto) {
        fixedAsset.registrationDate = new Date(fixedAsset.registrationDate!);
    }
}
