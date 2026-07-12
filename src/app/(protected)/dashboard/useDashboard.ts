"use client";

import { DashboardDto } from "@/dtos/dashboard.dto";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";

const route = "./api/dashboard";

export default function useDashboard() {

    const [statistics, setStatistics] = useState<DashboardDto>({
        employees: 0,
        departments: 0,
        accountingAccounts: 0,
        fixedAssets: 0
    });

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {

        (async () => {

            setIsLoading(true);

            const response = await fetcher<DashboardDto>(
                `${route}/getStatistics`
            );

            setStatistics(response.data);

            setIsLoading(false);

        })();

    }, []);

    return {
        statistics,
        isLoading
    };

}