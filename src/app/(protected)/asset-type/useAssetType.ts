"use client"

import { AccountingAccountDto, AssetTypeDto, DepartmentDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { AccountType } from "@/generated/prisma/enums";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useEffect, useState } from "react";

const route = "/api/asset-type"
const routeAccountingAccount = "/api/accounting-account"

export default function useAssetType() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [assetTypes, setAssetTypes] = useState<AssetTypeDto[]>([]);
    const [accountingAccounts, setAccountingAccounts] = useState<AccountingAccountDto[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setAssetTypes(await getAll());
            setAccountingAccounts(await getAllAccountingAccounts());
            setIsLoading(false)
        })()
    }, [])

    const getAllAccountingAccounts = async () => {
        const params = new URLSearchParams();

        const key = "accountType";

        params.append(key, AccountType.ASSET);
        params.append(key, AccountType.CONTRA_ASSET);

        const accountingAccounts = await fetcher<AccountingAccountDto[]>(`${routeAccountingAccount}/getAll?${params}`);
        return accountingAccounts.data;
    }

    const getAll = async () => {
        const assetTypes = await fetcher<AssetTypeDto[]>(`${route}/getAll`);
        return assetTypes.data;
    }

    const getById = async (id: number) => {
        const assetTypes = await fetcher<AssetTypeDto>(`${route}/getById/${id}`);
        return assetTypes.data;
    }

    const create = async (assetType: AssetTypeDto) => {
        setIsLoading(true);
        const response = await fetcher<AssetTypeDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(assetType)
        });

        setAssetTypes(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Tipo de activo creado con exito");
    }

    const update = async (assetType: AssetTypeDto) => {
        setIsLoading(true);
        const response = await fetcher<AssetTypeDto>(`${route}/update/${assetType.id}`, {
            method: "PUT",
            body: JSON.stringify(assetType)
        });

        setAssetTypes(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Tipo de activo editado con exito");
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        const response = await fetcher<AssetTypeDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        setAssetTypes(await getAll())
        setIsLoading(false)

        await handleMutationResponse(response, "Tipo de activo eliminado con exito");
    }

    const handleMutationResponse = async (
        response: ErrorResponseDto<AssetTypeDto>,
        successMessage: string
    ) => {
        if (!response.ok) {
            notify.error(
                "Error",
                response.errorMessage
            )
            return
        }

        notify.success("Exito", successMessage);
        setAssetTypes(await getAll());
    };

    return {
        isLoading,
        assetTypes,
        accountingAccounts,
        getById,
        create,
        update,
        deleteById
    }
}