"use client"

import { AssetTypeDto } from "@/dtos";
import { Button, Col, Form, Input, Modal, Row, Select, Skeleton, Space } from "antd";
import { useState } from "react";
import useAssetType from "./useAssetType";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Table, { ColumnsType } from "antd/es/table";
import TextArea from "antd/es/input/TextArea";
import { rules } from "@/rules";
import { AccountType } from "@/generated/prisma/enums";

const newAssetType: AssetTypeDto = {
    id: undefined,
    name: "",
    description: "",
    status: true,
    createdAt: new Date(),
    updatedAt: null
}

export default function AssetType() {

    const {
        isLoading,
        assetTypes,
        accountingAccounts,
        getById,
        create,
        update,
        deleteById
    } = useAssetType();

    const [form] = Form.useForm();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const columns: ColumnsType<AssetTypeDto> = [
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
            title: "Cuenta Contable Compra",
            dataIndex: "purchaseAccountId",
            key: "purchaseAccount",
            render: (_: number, record: AssetTypeDto) => {
                return `${record.purchaseAccount?.accountNumber} - ${record.purchaseAccount?.accountName}`
            }
        },
        {
            title: "Cuenta Contable Depreciacion",
            dataIndex: "depreciationAccountId",
            key: "depreciationAccount",
            render: (_: number, record: AssetTypeDto) => {
                return `${record.depreciationAccount?.accountNumber} - ${record.depreciationAccount?.accountName}`
            }
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            render: (_, record: AssetTypeDto) => (
                <Space>
                    <Button color="yellow" variant="solid" icon={<EditOutlined style={{ color: "black" }} />} onClick={async () => await onEdit(record.id!)} />
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteById(record.id!)} />
                </Space>
            )
        },
    ];

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue(newAssetType);
    }

    const onFinish = async (values: AssetTypeDto) => {
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

    const getAccounts = (accountType: AccountType) => {
        return accountingAccounts.filter(aa => aa.accountType == accountType).map(aa => ({
            value: aa.id,
            label: `${aa.accountNumber} - ${aa.accountName}`,
        }))
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
                    <Button key="save" type="primary" onClick={() => form.submit()}>
                        Guardar
                    </Button>,
                ]}
            >
                <Form form={form} initialValues={newAssetType} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="id" hidden>
                        {isEditLoading ? <Skeleton.Input active /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Nombre" name="name" rules={[rules.required("Nombre")]}>
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item name="purchaseAccountId" label="Cuenta contable de compra" rules={[rules.required("Cuenta contable de compra")]}>
                        {isEditLoading
                            ? <Skeleton.Input active block />
                            : <Select
                                placeholder="Selecciona una cuenta contable de compra"
                                options={getAccounts(AccountType.ASSET)}
                            />}
                    </Form.Item>

                    <Form.Item name="depreciationAccountId" label="Cuenta contable de depreciacion" rules={[rules.required("Cuenta contable de depreciacion")]}>
                        {isEditLoading
                            ? <Skeleton.Input active block />
                            : <Select
                                placeholder="Selecciona una cuenta contable de depreciacion"
                                options={getAccounts(AccountType.CONTRA_ASSET)}
                            />}
                    </Form.Item>

                    <Form.Item label="Descripcion" name="description">
                        {isEditLoading ? <Skeleton.Input active block /> : <TextArea />}
                    </Form.Item>
                </Form>
            </Modal>

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={assetTypes}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
            />
        </>
    )
}