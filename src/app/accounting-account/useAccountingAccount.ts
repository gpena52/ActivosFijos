"use client"

import { AccountingAccountDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { notification } from "antd";
import { useEffect, useState } from "react";

const route = "/api/accounting-account"

export default function useAccountingAccount() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accountingAccounts, setAccountingAccounts] = useState<AccountingAccountDto[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setAccountingAccounts(await getAll());
            setIsLoading(false)
        })()
    }, [])

    const getAll = async () => {
        const accountingAccounts = await fetcher<AccountingAccountDto[]>(`${route}/getAll`);
        return accountingAccounts.data;
    }

    const getById = async (id: number) => {
        const accountingAccount = await fetcher<AccountingAccountDto>(`${route}/getById/${id}`);
        return accountingAccount.data;
    }

    const create = async (accountingAccount: AccountingAccountDto) => {
        setIsLoading(true);
        const response = await fetcher<AccountingAccountDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(accountingAccount)
        });

        await handleSaveResponse(
            response,
            "Cuenta creada con exito",
            accountingAccount.accountNumber
        );

        setIsLoading(false);
    }

    const update = async (accountingAccount: AccountingAccountDto) => {
        setIsLoading(true);
        const response = await fetcher<AccountingAccountDto>(`${route}/update/${accountingAccount.id}`, {
            method: "PUT",
            body: JSON.stringify(accountingAccount)
        });

        await handleSaveResponse(
            response,
            "Cuenta editada con exito",
            accountingAccount.accountNumber
        );

        setIsLoading(false);
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        const response = await fetcher<AccountingAccountDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        await handleSaveResponse(
            response,
            "Cuenta eliminada con exito",
            ''
        );

        setIsLoading(false)
    }

    const handleSaveResponse = async (
        response: ErrorResponseDto<AccountingAccountDto>,
        successMessage: string,
        accountNumber: string
    ) => {
        if (!response.ok && response.code === 409) {
            notify.error(
                "Error",
                `Ya existe una cuenta con el numero ${accountNumber}`
            );
            return;
        } else {
            notify.error(
                "Error",
                response.message
            )
        }

        notify.success("Exito", successMessage);
        setAccountingAccounts(await getAll());
    };

    return {
        isLoading,
        accountingAccounts,
        getById,
        create,
        update,
        deleteById
    }
}
