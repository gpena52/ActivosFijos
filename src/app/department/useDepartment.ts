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
            setIsLoading(true);
            setDepartments(await getAll());
            setIsLoading(false)
        })()
    }, [])

    const getAll = async () => {
        const departments = await fetcher<DepartmentDto[]>(`${route}/getAll`);
        return departments;
    }

    const getById = async (id: number) => {
        const departments = await fetcher<DepartmentDto>(`${route}/getById/${id}`);
        return departments;
    }

    const create = async (department: DepartmentDto) => {
        setIsLoading(true);
        await fetcher<DepartmentDto[]>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(department)
        });
        setDepartments(await getAll());
        setIsLoading(false);
    }

    const update = async (department: DepartmentDto) => {
        setIsLoading(true);
        await fetcher<DepartmentDto[]>(`${route}/update/${department.id}`, {
            method: "PUT",
            body: JSON.stringify(department)
        });
        setDepartments(await getAll());
        setIsLoading(false);
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        await fetcher<DepartmentDto[]>(`${route}/delete/${id}`, {
            method: "DELETE"
        });
        setDepartments(await getAll())
        setIsLoading(false)
    }

    return {
        isLoading,
        departments,
        getById,
        create,
        update,
        deleteById
    }
}