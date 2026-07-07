"use client";

import { EmployeeDto } from "@/dtos";
import { ErrorResponseDto } from "@/dtos/error-response.dto";
import { fetcher } from "@/utils/fetcher";
import { notify } from "@/utils/notification";
import { useEffect, useState } from "react";

const route = "/api/employee";

export default function useEmployees() {

    const [isLoading, setIsLoading] = useState(false);
    const [employees, setEmployees] = useState<EmployeeDto[]>([]);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            setEmployees(await getAll());
            setIsLoading(false);
        })();
    }, []);

    const getAll = async () => {
        const response = await fetcher<EmployeeDto[]>(`${route}/getAll`);
        return response.data;
    };

    const getById = async (id: number) => {
        const response = await fetcher<EmployeeDto>(`${route}/getById/${id}`);
        return response.data;
    };

    const create = async (employee: EmployeeDto) => {
        setIsLoading(true);

        const response = await fetcher<EmployeeDto>(`${route}/create`, {
            method: "POST",
            body: JSON.stringify(employee)
        });

        await handleSaveResponse(
            response,
            "Empleado creado con éxito",
            employee.nationalId
        );

        setIsLoading(false);
    };

    const update = async (employee: EmployeeDto) => {

        setIsLoading(true);

        const response = await fetcher<EmployeeDto>(`${route}/update/${employee.id}`, {
            method: "PUT",
            body: JSON.stringify(employee)
        });

        await handleSaveResponse(
            response,
            "Empleado actualizado con éxito",
            employee.nationalId
        );

        setIsLoading(false);
    };

    const deleteById = async (id: number) => {

        setIsLoading(true);

        const response = await fetcher<EmployeeDto>(`${route}/delete/${id}`, {
            method: "DELETE"
        });

        await handleSaveResponse(
            response,
            "Empleado eliminado con éxito",
            ""
        );

        setIsLoading(false);
    };

    const handleSaveResponse = async (
        response: ErrorResponseDto<EmployeeDto>,
        successMessage: string,
        nationalId: string
    ) => {

        if (!response.ok && response.code === 409) {

            notify.error(
                "Error",
                `Ya existe un empleado con la cédula ${nationalId}`
            );

            return;
        } else if (!response.ok) {

            notify.error(
                "Error",
                response.message
            );

            return;
        }

        notify.success("Éxito", successMessage);

        setEmployees(await getAll());
    };

    return {
        isLoading,
        employees,
        getById,
        create,
        update,
        deleteById
    };
}