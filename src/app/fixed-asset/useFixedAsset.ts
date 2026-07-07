"use client"

import { AssetTypeDto, DepartmentDto, FixedAssetDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useEffect, useState } from "react";

const route = "/api/fixed-asset"
const routeDepartment = "/api/department"
const routeAssetType = "/api/asset-type"

export default function useFixedAsset() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [fixedAssets, setFixedAssets] = useState<FixedAssetDto[]>([]);
    const [departments, setDepartments] = useState<DepartmentDto[]>([]);
    const [assetTypes, setAssetTypes] = useState<AssetTypeDto[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setFixedAssets(await getAll());
            setDepartments(await getAllDepartments());
            setAssetTypes(await getAllAssetTypes());
            setIsLoading(false)
        })()
    }, [])

    const getAllDepartments = async () => {
        const departments = await fetcher<DepartmentDto[]>(`${routeDepartment}/getAll`);
        return departments.data;
    }

    const getAllAssetTypes = async () => {
        const departments = await fetcher<AssetTypeDto[]>(`${routeAssetType}/getAll`);
        return departments.data;
    }

    const getAll = async () => {
        const fixedAssets = await fetcher<FixedAssetDto[]>(`${route}/getAll`);
        return fixedAssets.data;
    }

    const getById = async (id: number) => {
        const fixedAssets = await fetcher<FixedAssetDto>(`${route}/getById/${id}`);
        return fixedAssets.data;
    }

    const create = async (fixedAsset: FixedAssetDto) => {
        setIsLoading(true);
        const response = await fetcher<FixedAssetDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(fixedAsset)
        });

        setFixedAssets(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Activo fijo creado con exito");
    }

    const update = async (fixedAsset: FixedAssetDto) => {
        setIsLoading(true);
        const response = await fetcher<FixedAssetDto>(`${route}/update/${fixedAsset.id}`, {
            method: "PUT",
            body: JSON.stringify(fixedAsset)
        });

        setFixedAssets(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Activo fijo editado con exito");
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        const response = await fetcher<FixedAssetDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        setFixedAssets(await getAll())
        setIsLoading(false)

        await handleMutationResponse(response, "Activo fijo eliminado con exito");
    }

    const handleMutationResponse = async (
        response: ErrorResponseDto<FixedAssetDto>,
        successMessage: string
    ) => {
        if (!response.ok) {
            notify.error(
                "Error",
                response.message
            )
            return
        }

        notify.success("Exito", successMessage);
        setFixedAssets(await getAll());
    };

    return {
        isLoading,
        fixedAssets,
        departments,
        assetTypes,
        getById,
        create,
        update,
        deleteById
    }
}