"use client";

import {
    Button,
    Form,
    Input,
    Modal,
    Select,
    Skeleton,
    Space,
    DatePicker,
    Typography
} from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";

import useEmployees from "./useEmployee";
import useDeparment from "../department/useDepartment";

import { EmployeeDto } from "@/dtos";
import { PersonType } from "@/generated/prisma/enums";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { rules } from "@/rules";
import DataFilters from "@/components/general/DataFilters";

const dateFormat = 'DD-MM-YYYY';

const newEmployee: EmployeeDto = {
    id: undefined,
    name: "",
    nationalId: "",
    departmentId: undefined,
    personType: undefined,
    hireDate: undefined,
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
    const [validateIdentification, setValidateIdentification] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState<number>();
    const [personTypeFilter, setPersonTypeFilter] = useState<PersonType>();
    const [hireDateRange, setHireDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    const filteredEmployees = useMemo(() => {
        const term = searchText.trim().toLowerCase();

        return employees.filter(employee => {
            const matchesSearch = !term ||
                employee.name?.toLowerCase().includes(term) ||
                employee.nationalId?.toLowerCase().includes(term);

            const matchesDepartment = !departmentFilter ||
                employee.departmentId === departmentFilter;

            const matchesPersonType = !personTypeFilter ||
                employee.personType === personTypeFilter;

            const matchesHireDate = !hireDateRange || (
                employee.hireDate !== undefined &&
                dayjs(employee.hireDate).valueOf() >= hireDateRange[0].startOf("day").valueOf() &&
                dayjs(employee.hireDate).valueOf() <= hireDateRange[1].endOf("day").valueOf()
            );

            return matchesSearch && matchesDepartment && matchesPersonType && matchesHireDate;
        });
    }, [employees, searchText, departmentFilter, personTypeFilter, hireDateRange]);

    const onClearFilters = () => {
        setSearchText("");
        setDepartmentFilter(undefined);
        setPersonTypeFilter(undefined);
        setHireDateRange(null);
    };

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
            render: (date: Date) => dayjs(date).format("DD-MM-YYYY")
        },
        {
            title: "Acciones",
            render: (_, record) => (
                <Space>
                    <Button color="yellow" variant="solid" style={{ color: "black" }}
                        icon={<EditOutlined />}
                        onClick={() => onEdit(record.id!)}
                    />
                    <Button type="primary" danger

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
        setValidateIdentification(false);
    };

    const onFinish = async (values: any) => {

        setModalOpen(false);

        const hireDate =
            values.hireDate?.toDate?.() ||
            values.hireDate ||
            new Date();

        const payload: EmployeeDto = {
            ...newEmployee,
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

    const onSubmit = () => {
        setValidateIdentification(true);
        form.submit();
    };

    return (
        <>
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Agregar Empleado
            </Button>

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
                    <Button key="save" type="primary" disabled={isEditLoading} onClick={onSubmit}>
                        Guardar
                    </Button>
                ]}
                classNames={{
                    body: "scrollable-modal",
                }}
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
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item label={
                        <>
                            Cédula
                            <Typography.Text className="ml-1" type="secondary">
                                (Sin guiones)
                            </Typography.Text>
                        </>
                    }
                        name="nationalId"
                        rules={[rules.required("Cédula"), rules.number, validateIdentification ? rules.indentification : {}]}
                        validateFirst
                    >
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item
                        label="Departamento"
                        name="departmentId"
                        rules={[rules.required("Departamento")]}
                    >
                        {isEditLoading
                            ? <Skeleton.Input active block />
                            : <Select
                                options={departments.map(d => ({
                                    label: d.name,
                                    value: d.id
                                }))}
                                placeholder="Seleccione un Departamento"
                            />
                        }

                    </Form.Item>

                    <Form.Item label="Tipo Persona" name="personType" rules={[rules.required("Tipo Persona")]}>
                        {isEditLoading
                            ? <Skeleton.Input active block />
                            : <Select
                                options={[
                                    { label: "Física", value: PersonType.INDIVIDUAL },
                                    { label: "Jurídica", value: PersonType.COMPANY }
                                ]}
                                placeholder="Seleccione un Tipo de Persona"
                            />
                        }
                    </Form.Item>

                    <Form.Item
                        label="Fecha de Ingreso"
                        name="hireDate"
                        rules={[rules.required("Fecha de Ingreso")]}
                        getValueProps={(value) => ({
                            value: value ? dayjs(value) : null
                        })}
                    >
                        {isEditLoading
                            ? <Skeleton.Input active block />
                            : <DatePicker style={{ width: "100%" }} placeholder="Seleccione una Fecha de Ingreso" format={dateFormat} />
                        }
                    </Form.Item>

                </Form>
            </Modal>

            <DataFilters
                searchValue={searchText}
                onSearchChange={setSearchText}
                searchPlaceholder="Buscar por nombre o cédula"
                selects={[
                    {
                        key: "department",
                        placeholder: "Filtrar por departamento",
                        value: departmentFilter,
                        onChange: setDepartmentFilter,
                        options: departments.map(department => ({
                            label: department.name,
                            value: department.id!
                        }))
                    },
                    {
                        key: "personType",
                        placeholder: "Filtrar por tipo de persona",
                        value: personTypeFilter,
                        onChange: setPersonTypeFilter,
                        options: [
                            { label: "Física", value: PersonType.INDIVIDUAL },
                            { label: "Jurídica", value: PersonType.COMPANY }
                        ]
                    }
                ]}
                dateRange={{
                    value: hireDateRange,
                    onChange: setHireDateRange,
                    placeholder: ["Ingreso desde", "Ingreso hasta"]
                }}
                onClear={onClearFilters}
            />

            <Table
                rowKey="id"
                loading={isLoading}
                dataSource={filteredEmployees}
                columns={columns}
                className="mt-5"
                scroll={{ x: true }}
            />
        </>
    );
}