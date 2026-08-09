import { AccountingServiceAccountDto, DepreciationRecordDto } from "@/dtos";
import { fetcher } from "@/utils/fetcher";
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

    return {
        isLoading,
        areAccountsLoading,
        accountingServiceAccounts,
        getAllByDateRange
    }
}