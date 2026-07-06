import { AssetTypeDto } from "@/dtos";
import { ApiError } from "@/errors/apiError";
import { AssetTypeRepository } from "@/repositories/backend/asset-type.dto.repository";
import { createAssetTypeSchema } from "@/validation/asset-type.schema";
import { updateDepartmentSchema } from "@/validation/department.schema";

const repository = new AssetTypeRepository();

export class AssetTypeService {

    async getAll() {
        return repository.getAll();
    }

    async getById(id: number) {
        return repository.getById(id);
    }

    async create(assetType: AssetTypeDto) {
        const validated = createAssetTypeSchema.safeParse(assetType);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        assetType.updatedAt = null;

        return repository.create(assetType);
    }

    async update(assetType: AssetTypeDto) {
        const validated = updateDepartmentSchema.safeParse(assetType);

        if (!validated.success) throw new ApiError(400, validated.error.message);

        return repository.update(assetType);
    }

    async delete(id: number) {
        return repository.delete(id);
    }
}