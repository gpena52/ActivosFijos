import { AccountingServiceAccountDto, DepreciationRecordDto, JournalEntryDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { JournalEntryRequest } from "@/dtos/journal-entry-request.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useEffect, useState } from "react";

const route = "/api/depreciation-record"

export default function useDepreciationSend() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [areAccountsLoading, setAreAccountsLoading] = useState<boolean>(false);
    const [accountingServiceAccounts, setAccountingServiceAccounts] = useState<AccountingServiceAccountDto[]>([]);

    useEffect(() => {
        (async () => {
            setAreAccountsLoading(true);
            setAccountingServiceAccounts(await getAccountingServiceAccounts());
            setAreAccountsLoading(false)
        })()
    }, [])

    const getAccountingServiceAccounts = async () => {
        const accountingServiceAccounts = await fetcher<AccountingServiceAccountDto[]>(`https://sistema-contabilidad.onrender.com/api/cuentas`);
        return accountingServiceAccounts.data;
    }

    const getAllByDateRange = async (startDate: Date, endDate: Date) => {
        setIsLoading(true);
        const depreciationRecords = await fetcher<DepreciationRecordDto[]>(`${route}/getAllByDateRange?startDate=${startDate}&endDate=${endDate}`);
        setIsLoading(false);
        return depreciationRecords.data;
    }

    const sendToAccounting = async (depreciationRecord: DepreciationRecordDto[]): Promise<JournalEntryDto[]> => {
        setIsLoading(true);
        const responses: JournalEntryDto[] = await Promise.all(
            depreciationRecord.map(async depreciationRecord => {
                const journalEntry = {
                    auxiliarId: 5,
                    cuentaDebitoId: depreciationRecord.fixedAsset!.assetType!.purchaseAccount!.accountingServiceAccountId!,
                    cuentaCreditoId: depreciationRecord.fixedAsset!.assetType!.depreciationAccount!.accountingServiceAccountId!,
                    descripcion: depreciationRecord.fixedAsset!.description!,
                    monto: depreciationRecord.accumulatedDepreciation
                }

                const response = await fetcher<JournalEntryDto>(`https://sistema-contabilidad.onrender.com/api/entradas`, {
                    method: "POST",
                    body: JSON.stringify(journalEntry)
                });

                return { ...response.data, depreciationId: depreciationRecord.id };
            })
        )

        setIsLoading(false);

        return responses;
    }

    const update = async (journalEntryDto: JournalEntryDto[]) => {
        setIsLoading(true);

        const response = await fetcher<DepreciationRecordDto[]>(`${route}/update`, {
            method: "PUT",
            body: JSON.stringify(journalEntryDto)
        });

        await handleSaveResponse(
            response,
            "Envio completado con exito"
        );

        setIsLoading(false);
    }

    const handleSaveResponse = async (
        response: ErrorResponseDto<DepreciationRecordDto[]>,
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
    };

    return {
        isLoading,
        areAccountsLoading,
        accountingServiceAccounts,
        getAllByDateRange,
        sendToAccounting,
        update
    }
}