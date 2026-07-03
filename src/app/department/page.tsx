"use client"

import { Button } from "antd";
import useDeparment from "./useDepartment";
import Table, { ColumnsType } from "antd/es/table";
import { DepartmentDto } from "@/dtos";

export default function Deparment() {

    const {
        departments,
        isLoading
    } = useDeparment();

    const columns: ColumnsType<DepartmentDto> = [
        {
            title: "Nombre",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Descripcion",
            dataIndex: "description",
            key: "description",
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
        },
    ];

    return (
        <>
            <Button type="primary">Agregar</Button>
            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={departments}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
            />
        </>
    );
}
