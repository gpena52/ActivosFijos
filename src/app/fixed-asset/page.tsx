"use client"

import { FixedAssetDto } from "@/dtos";
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, Skeleton, Space } from "antd";
import { useState } from "react";
import useFixedAsset from "./useFixedAsset";
import Table, { ColumnsType } from "antd/es/table";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { rules } from "@/rules";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";

const gutter = 16;
const fullWidth = 24;
const halfWidth = 12;
const dateFormat = 'YYYY-MM-DD';

interface FixedAssetFormValues extends FixedAssetDto {
    dateValue?: dayjs.Dayjs;
}

const newFixedAsset: FixedAssetFormValues = {
    id: undefined,
    name: "",
    description: "",
    departmentId: undefined,
    assetTypeId: undefined,
    registrationDate: undefined,
    purchaseValue: undefined,
    accumulatedDepreciation: undefined,
    status: true,
    createdAt: new Date(),
    updatedAt: null
}

export default function FixedAsset() {

    const {
        isLoading,
        fixedAssets,
        departments,
        assetTypes,
        getById,
        create,
        update,
        deleteById
    } = useFixedAsset();

    const [form] = Form.useForm();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const columns: ColumnsType<FixedAssetDto> = [
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
            title: "Departamento",
            dataIndex: "department",
            key: "department",
            render: (_: number, record: FixedAssetDto) => {
                return `${record.department?.name}`
            }
        },
        {
            title: "Tipo de Activo",
            dataIndex: "assetType",
            key: "assetType",
            render: (_: number, record: FixedAssetDto) => {
                return `${record.assetType?.name}`
            }
        },
        {
            title: "Fecha de Registro",
            dataIndex: "registrationDate",
            key: "registrationDate",
            render: (_, record: FixedAssetDto) => {
                return `${dayjs(record.registrationDate).format("DD-MM-YYYY")}`
            }
        },
        {
            title: "Valor de Compra",
            dataIndex: "purchaseValue",
            key: "purchaseValue"
        },
        {
            title: "Depreciacion Acumulada",
            dataIndex: "accumulatedDepreciation",
            key: "accumulatedDepreciation"
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            render: (_, record: FixedAssetDto) => (
                <Space>
                    <Button color="yellow" variant="solid" icon={<EditOutlined style={{ color: "black" }} />} onClick={async () => await onEdit(record.id!)} />
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteById(record.id!)} />
                </Space>
            )
        },
    ];

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue(newFixedAsset);
    }

    const onFinish = async (formValues: FixedAssetFormValues) => {
        setModalOpen(false);
        formValues.registrationDate = formValues.dateValue?.toDate();
        const { dateValue: undefined, ...values } = formValues;
        (values.id) ? await update(values) : await create(values);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setIsEditLoading(true)
        setModalOpen(true);
        const fixedAsset = (await getById(id));
        form.setFieldsValue({
            ...fixedAsset,
            dateValue: dayjs(fixedAsset.registrationDate),
            purchaseValue: Number(fixedAsset.purchaseValue),
            accumulatedDepreciation: Number(fixedAsset.accumulatedDepreciation),
        });
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
                    <h3 className="mt-2" style={{ textAlign: "center" }}>
                        Llene los campos
                    </h3>
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
            >
                <Form form={form} initialValues={newFixedAsset} layout="vertical" onFinish={onFinish}>
                    <Row gutter={gutter}>
                        <Col span={fullWidth}>
                            <Form.Item name="id" hidden>
                                {isEditLoading ? <Skeleton.Input active /> : <Input />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth}>
                            <Form.Item label="Nombre" name="name" rules={[rules.required("Nombre")]}>
                                {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item label="Departamento" name="departmentId" rules={[rules.required("Departamento")]}>
                                {isEditLoading
                                    ? <Skeleton.Input active block />
                                    : <Select
                                        placeholder="Selecciona un departamento"
                                        options={departments.map(department => ({
                                            value: department.id,
                                            label: department.name
                                        }))}
                                    />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item label="Tipo de Activo" name="assetTypeId" rules={[rules.required("Tipo de Activo")]}>
                                {isEditLoading
                                    ? <Skeleton.Input active block />
                                    : <Select
                                        placeholder="Selecciona un tipo de activo"
                                        options={assetTypes.map(assetType => ({
                                            value: assetType.id,
                                            label: assetType.name
                                        }))}
                                    />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth}>
                            <Form.Item label="Fecha de Registro" name="dateValue" rules={[rules.required("Fecha de Registro")]}>
                                {isEditLoading ? <Skeleton.Input active block /> : <DatePicker className="w-100" placeholder="Seleccione una Fecha de Registro" />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item label="Valor de Compra" name="purchaseValue" rules={[rules.required("Valor de Compra"), rules.min(1)]}>
                                {isEditLoading ? <Skeleton.Input active block /> : <InputNumber type="number" className="w-100" />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item label="Depreciacion Acumulada" name="accumulatedDepreciation" rules={[rules.required("Depreciacion Acumulada"), rules.min(1)]}>
                                {isEditLoading ? <Skeleton.Input active block /> : <InputNumber type="number" className="w-100" />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth}>
                            <Form.Item label="Descripcion" name="description">
                                {isEditLoading ? <Skeleton.Input active block /> : <TextArea />}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal >

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={fixedAssets}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
                scroll={{ x: true }}
            />
        </>
    )
}