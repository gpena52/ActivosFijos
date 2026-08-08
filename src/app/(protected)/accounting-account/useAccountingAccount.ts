"use client"

import { AccountingAccountDto, AccountingServiceAccountDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useEffect, useState } from "react";

const route = "/api/accounting-account"
const accountingServiceAccountsList: AccountingServiceAccountDto[] = [
    {
        "id": 1,
        "codigo": "101",
        "nombre": "Caja General",
        "permiteTransacciones": true,
        "estado": "ACTIVO"
    },
    {
        "id": 2,
        "codigo": "201",
        "nombre": "Cuentas por Pagar",
        "permiteTransacciones": true,
        "estado": "ACTIVO"
    },
    {
        "id": 3,
        "codigo": "301",
        "nombre": "Capital Social",
        "permiteTransacciones": true,
        "estado": "ACTIVO"
    },
    {
        "id": 4,
        "codigo": "501",
        "nombre": "Gasto de Nomina",
        "permiteTransacciones": true,
        "estado": "ACTIVO"
    },
    {
        "id": 5,
        "codigo": "202",
        "nombre": "Nomina por Pagar",
        "permiteTransacciones": true,
        "estado": "ACTIVO"
    }
]

export default function useAccountingAccount() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [accountingAccounts, setAccountingAccounts] = useState<AccountingAccountDto[]>([]);
    const [accountingServiceAccounts, setAccountingServiceAccounts] = useState<AccountingServiceAccountDto[]>(accountingServiceAccountsList);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setAccountingAccounts(await getAll());
            // setAccountingServiceAccounts(await getAccountingServiceAccounts());
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

    const getAccountingServiceAccounts = async () => {
        const accountingServiceAccounts = await fetcher<AccountingServiceAccountDto[]>(`https://sistema-contabilidad.onrender.com/api/cuentas`);
        return accountingServiceAccounts.data;
    }

    const create = async (accountingAccount: AccountingAccountDto) => {
        setIsLoading(true);
        const response = await fetcher<AccountingAccountDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(accountingAccount)
        });

        setIsLoading(false);

        await handleSaveResponse(
            response,
            "Cuenta creada con exito",
            accountingAccount.accountNumber
        );
    }

    const update = async (accountingAccount: AccountingAccountDto) => {
        setIsLoading(true);
        const response = await fetcher<AccountingAccountDto>(`${route}/update/${accountingAccount.id}`, {
            method: "PUT",
            body: JSON.stringify(accountingAccount)
        });

        setIsLoading(false);

        await handleSaveResponse(
            response,
            "Cuenta editada con exito",
            accountingAccount.accountNumber
        );
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        const response = await fetcher<AccountingAccountDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        setIsLoading(false)

        await handleSaveResponse(
            response,
            "Cuenta eliminada con exito",
            ''
        );
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
        } else if (!response.ok) {
            notify.error(
                "Error",
                response.errorMessage
            )
            return
        }

        notify.success("Exito", successMessage);
        setAccountingAccounts(await getAll());
    };

    return {
        isLoading,
        accountingAccounts,
        accountingServiceAccounts,
        getById,
        create,
        update,
        deleteById
    }
}
