"use client"

import { DepartmentDto } from "@/dtos";
import { fetcher } from "@/utils/fetcher";
import { useEffect, useState } from "react";

const route = "/api/department"

export default function useDeparment() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [departments, setDepartments] = useState<DepartmentDto[]>([]);

    useEffect(() => {
        (async () => {
            setDepartments(await getAll());
        })()
    }, [])

    const getAll = async () => {
        setIsLoading(true);
        const departments = await fetcher<DepartmentDto[]>(route);
        setIsLoading(false)
        return departments;
    }

    return {
        departments,
        isLoading
    }
}