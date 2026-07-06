"use client";

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Skeleton,
    Space,
    DatePicker
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useState } from "react";
import dayjs from "dayjs";

import useEmployees from "./useEmployee";
import useDeparment from "../department/useDepartment";

import { EmployeeDto } from "@/dtos";
import { PersonType } from "@/generated/prisma/enums";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { rules } from "@/rules";

const newEmployee: EmployeeDto = {
    id: undefined,
    name: "",
    nationalId: "",
    departmentId: 0,
    personType: PersonType.INDIVIDUAL,
    hireDate: new Date(),
    status: true,
    createdAt: new Date(),
    updatedAt: null
};

export default function EmployeesPage() {

    const {
        isLoading,
        employees,
        getById,
        create,
        update,
        deleteById
    } = useEmployees();

    const { departments } = useDeparment();

    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);

    const columns: ColumnsType<EmployeeDto> = [
        {
            title: "Nombre",
            dataIndex: "name"
        },
        {
            title: "Cédula",
            dataIndex: "nationalId"
        },
        {
            title: "Departamento",
            render: (_, record) =>
                departments.find(d => d.id === record.departmentId)?.name ?? "-"
        },
        {
            title: "Tipo Persona",
            dataIndex: "personType",
            render: (value: PersonType) =>
                value === PersonType.INDIVIDUAL ? "Física" : "Jurídica"
        },
        {
            title: "Fecha Ingreso",
            dataIndex: "hireDate",
            render: (date: Date) => dayjs(date).format("YYYY-MM-DD")
        },
        {
            title: "Estado",
            dataIndex: "status",
            render: (status: boolean) => status ? "Activo" : "Inactivo"
        },
        {
            title: "Acciones",
            render: (_, record) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record.id!)}
                    />
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteById(record.id!)}
                    />
                </Space>
            )
        }
    ];

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue(newEmployee);
    };

    const onFinish = async (values: any) => {

    setModalOpen(false);

    const hireDate =
        values.hireDate?.toDate?.() ||
        values.hireDate ||
        new Date();

    const payload: EmployeeDto = {
        ...values,
        hireDate
    };

    values.id ? await update(payload) : await create(payload);

    clearForm();
};

    const onEdit = async (id: number) => {

        setModalOpen(true);
        setIsEditLoading(true);

        const employee = await getById(id);

        form.setFieldsValue({
            ...employee,
            hireDate: employee.hireDate ? dayjs(employee.hireDate) : null
        });

        setIsEditLoading(false);
    };

    const onCancel = () => {
        setModalOpen(false);
        clearForm();
    };

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Agregar Empleado
            </Button>

            <Modal
                open={modalOpen}
                onCancel={onCancel}
                footer={[
                    <Button key="cancel" danger onClick={onCancel}>
                        Cancelar
                    </Button>,
                    <Button key="save" type="primary" onClick={() => form.submit()}>
                        Guardar
                    </Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    initialValues={newEmployee}
                    onFinish={onFinish}
                >

                    <Form.Item name="id" hidden>
                        <Input />
                    </Form.Item>

                    <Form.Item label="Nombre" name="name" rules={[rules.required("Nombre")]}>
                        {isEditLoading ? <Skeleton.Input active /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Cédula" name="nationalId" rules={[rules.required("Cédula")]}>
                        {isEditLoading ? <Skeleton.Input active /> : <Input />}
                    </Form.Item>

                    <Form.Item
                        label="Departamento"
                        name="departmentId"
                        rules={[rules.required("Departamento")]}
                    >
                        <Select
                            options={departments.map(d => ({
                                label: d.name,
                                value: d.id
                            }))}
                        />
                    </Form.Item>

                    <Form.Item label="Tipo Persona" name="personType">
                        <Select
                            options={[
                                { label: "Física", value: PersonType.INDIVIDUAL },
                                { label: "Jurídica", value: PersonType.COMPANY }
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Fecha de Ingreso"
                        name="hireDate"
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : null
                        })}
                    >
                        <DatePicker style={{ width: "100%" }} />
                    </Form.Item>

                    <Form.Item label="Estado" name="status">
                        <Select
                            options={[
                                { label: "Activo", value: true },
                                { label: "Inactivo", value: false }
                            ]}
                        />
                    </Form.Item>

                </Form>
            </Modal>

            <Table
                rowKey="id"
                loading={isLoading}
                dataSource={employees}
                columns={columns}
                className="mt-5"
            />
        </>
    );
}