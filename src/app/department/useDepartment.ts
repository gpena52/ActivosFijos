"use client"

import { DepartmentDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
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
        return departments.data;
    }

    const getById = async (id: number) => {
        const departments = await fetcher<DepartmentDto>(`${route}/getById/${id}`);
        return departments.data;
    }

    const create = async (department: DepartmentDto) => {
        setIsLoading(true);
        const response = await fetcher<DepartmentDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(department)
        });

        setDepartments(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Departamento creado con exito");
    }

    const update = async (department: DepartmentDto) => {
        setIsLoading(true);
        const response = await fetcher<DepartmentDto>(`${route}/update/${department.id}`, {
            method: "PUT",
            body: JSON.stringify(department)
        });

        setDepartments(await getAll());
        setIsLoading(false);

        await handleMutationResponse(response, "Departamento editado con exito");
    }

    const deleteById = async (id: number) => {
        setIsLoading(true)
        const response = await fetcher<DepartmentDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        setDepartments(await getAll())
        setIsLoading(false)

        await handleMutationResponse(response, "Departamento eliminado con exito");
    }

    const handleMutationResponse = async (
        response: ErrorResponseDto<DepartmentDto>,
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
        setDepartments(await getAll());
    };

    return {
        isLoading,
        departments,
        getById,
        create,
        update,
        deleteById
    }
}