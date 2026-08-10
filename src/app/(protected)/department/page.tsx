"use client"

import { Button, Empty, Form, Input, Modal, Skeleton, Space, Typography } from "antd";
import useDeparment from "./useDepartment";
import Table, { ColumnsType } from "antd/es/table";
import { DepartmentDto } from "@/dtos";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { rules } from "@/rules";
import DataFilters from "@/components/general/DataFilters";

const newDepartment: DepartmentDto = {
    id: undefined,
    name: "",
    description: "",
    status: true,
    createdAt: new Date(),
    updatedAt: null
}

export default function Deparment() {

    const {
        isLoading,
        departments,
        getById,
        create,
        update,
        deleteById
    } = useDeparment();

    const [form] = Form.useForm();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchText, setSearchText] = useState("");

    const filteredDepartments = useMemo(() => {
        const term = searchText.trim().toLowerCase();

        if (!term) return departments;

        return departments.filter(department =>
            department.name?.toLowerCase().includes(term) ||
            department.description?.toLowerCase().includes(term)
        );
    }, [departments, searchText]);

    const onClearFilters = () => {
        setSearchText("");
    };

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
            render: (_, record: DepartmentDto) => (
                <Space>
                    <Button color="yellow" variant="solid" icon={<EditOutlined style={{ color: "black" }} />} onClick={async () => await onEdit(record.id!)} />
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteById(record.id!)} />
                </Space>
            )
        },
    ];

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue(newDepartment);
    }

    const onFinish = async (values: DepartmentDto) => {
        setModalOpen(false);
        (values.id) ? await update(values) : await create(values);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setIsEditLoading(true)
        setModalOpen(true);
        const department = (await getById(id));
        form.setFieldsValue(department);
        setIsEditLoading(false)
    }

    const onCancel = () => {
        setModalOpen(false);
        clearForm();
    }

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>Agregar</Button>

            <Modal
                title={
                    <Typography.Title level={4} className="text-center mt-2">
                        Llene los campos
                    </Typography.Title>
                }
                open={modalOpen}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" type="primary" danger onClick={onCancel}>
                        Cancelar
                    </Button>,
                    <Button key="save" type="primary" disabled={isEditLoading} onClick={() => form.submit()}>
                        Guardar
                    </Button >,
                ]
                }
                classNames={{
                    body: "scrollable-modal",
                }}
            >
                <Form form={form} initialValues={newDepartment} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="id" hidden>
                        {isEditLoading ? <Skeleton.Input active /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Nombre" name="name" rules={[rules.required("Nombre")]}>
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Descripcion" name="description">
                        {isEditLoading ? <Skeleton.Input active block /> : <TextArea />}
                    </Form.Item>
                </Form>
            </Modal >

            <DataFilters
                searchValue={searchText}
                onSearchChange={setSearchText}
                searchPlaceholder="Buscar por nombre o descripción"
                onClear={onClearFilters}
            />

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={filteredDepartments}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
                scroll={{ x: true }}
                locale={{
                    emptyText: <Empty description="No hay departamentos" />
                }}
            />
        </>
    );
}
