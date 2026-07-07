"use client"

import { Button, Form, Input, Modal, Select, Skeleton, Space } from "antd";
import useAccountingAccount from "./useAccountingAccount";
import Table, { ColumnsType } from "antd/es/table";
import { AccountingAccountDto } from "@/dtos";
import { AccountType } from "@/generated/prisma/enums";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { rules } from "@/rules";
import { accountTypeLabels } from "@/constants/enums";

const newAccountingAccount: AccountingAccountDto = {
    id: undefined,
    accountNumber: "",
    accountName: "",
    accountType: AccountType.ASSET,
    status: true,
    createdAt: new Date(),
    updatedAt: null
}

export default function AccountingAccount() {

    const {
        isLoading,
        accountingAccounts,
        getById,
        create,
        update,
        deleteById
    } = useAccountingAccount();

    const [form] = Form.useForm();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const columns: ColumnsType<AccountingAccountDto> = [
        {
            title: "Numero",
            dataIndex: "accountNumber",
            key: "accountNumber",
        },
        {
            title: "Nombre",
            dataIndex: "accountName",
            key: "accountName",
        },
        {
            title: "Tipo",
            dataIndex: "accountType",
            key: "accountType",
            render: (accountType: AccountType) => accountTypeLabels[accountType],
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            render: (_, record: AccountingAccountDto) => (
                <Space>
                    <Button color="yellow" variant="solid" icon={<EditOutlined style={{ color: "black" }} />} onClick={async () => await onEdit(record.id!)} />
                    <Button type="primary" danger icon={<DeleteOutlined />} onClick={() => deleteById(record.id!)} />
                </Space>
            )
        },
    ];

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue(newAccountingAccount);
    }

    const onFinish = async (values: AccountingAccountDto) => {
        setModalOpen(false);
        (values.id) ? await update(values) : await create(values);
        clearForm();
    };

    const onEdit = async (id: number) => {
        setIsEditLoading(true)
        setModalOpen(true);
        const accountingAccount = (await getById(id));
        form.setFieldsValue(accountingAccount);
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
                <Form form={form} initialValues={newAccountingAccount} layout="vertical" onFinish={onFinish}>
                    <Form.Item name="id" hidden>
                        {isEditLoading ? <Skeleton.Input active /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Numero" name="accountNumber" rules={[rules.required("Numero"), rules.number]}>
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Nombre" name="accountName" rules={[rules.required("Nombre")]}>
                        {isEditLoading ? <Skeleton.Input active block /> : <Input />}
                    </Form.Item>

                    <Form.Item label="Tipo" name="accountType" rules={[rules.required("Tipo")]}>
                        {isEditLoading ? (
                            <Skeleton.Input active block />
                        ) : (
                            <Select
                                options={Object.values(AccountType).map((accountType) => ({
                                    label: accountTypeLabels[accountType],
                                    value: accountType,
                                }))}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal >

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={accountingAccounts}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
                scroll={{ x: true }}
            />
        </>
    );
}
