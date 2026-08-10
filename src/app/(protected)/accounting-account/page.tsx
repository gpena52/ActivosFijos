"use client"

import { Button, Empty, Form, Input, Modal, Select, Skeleton, Space, Typography } from "antd";
import useAccountingAccount from "./useAccountingAccount";
import Table, { ColumnsType } from "antd/es/table";
import { AccountingAccountDto } from "@/dtos";
import { AccountType } from "@/generated/prisma/enums";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMemo, useState } from "react";
import { rules } from "@/rules";
import { accountTypeLabels } from "@/constants/enums";
import DataFilters from "@/components/general/DataFilters";

const newAccountingAccount: AccountingAccountDto = {
    id: undefined,
    accountNumber: "",
    accountName: "",
    accountType: AccountType.ASSET,
    status: true,
    createdAt: new Date(),
    updatedAt: null,
    accountingServiceAccountId: null
}

export default function AccountingAccount() {

    const {
        isLoading,
        accountingAccounts,
        accountingServiceAccounts,
        getById,
        create,
        update,
        deleteById
    } = useAccountingAccount();

    const [form] = Form.useForm();
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const [searchText, setSearchText] = useState("");
    const [accountTypeFilter, setAccountTypeFilter] = useState<AccountType>();

    const filteredAccountingAccounts = useMemo(() => {
        const term = searchText.trim().toLowerCase();

        return accountingAccounts.filter(account => {
            const matchesSearch = !term ||
                account.accountNumber?.toLowerCase().includes(term) ||
                account.accountName?.toLowerCase().includes(term);

            const matchesType = !accountTypeFilter || account.accountType === accountTypeFilter;

            return matchesSearch && matchesType;
        });
    }, [accountingAccounts, searchText, accountTypeFilter]);

    const onClearFilters = () => {
        setSearchText("");
        setAccountTypeFilter(undefined);
    };

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

                    <Form.Item label="Cuenta del Servicio de Contabilidad" name="accountingServiceAccountId" rules={[rules.required("Cuenta del Servicio de Contabilidad")]}>
                        {isEditLoading ? (
                            <Skeleton.Input active block />
                        ) : (
                            <Select
                                placeholder="Seleccione una cuenta"
                                options={accountingServiceAccounts
                                    .filter(accountingServiceAccount => accountingServiceAccount.permiteTransacciones && accountingServiceAccount.estado == "ACTIVO")
                                    .map((accountingServiceAccount) => ({
                                        label: `${accountingServiceAccount.codigo} - ${accountingServiceAccount.nombre}`,
                                        value: accountingServiceAccount.id,
                                    }))}
                            />
                        )}
                    </Form.Item>
                </Form>
            </Modal >

            <DataFilters
                searchValue={searchText}
                onSearchChange={setSearchText}
                searchPlaceholder="Buscar por número o nombre"
                selects={[
                    {
                        key: "accountType",
                        placeholder: "Filtrar por tipo",
                        value: accountTypeFilter,
                        onChange: setAccountTypeFilter,
                        options: Object.values(AccountType).map(accountType => ({
                            label: accountTypeLabels[accountType],
                            value: accountType
                        }))
                    }
                ]}
                onClear={onClearFilters}
            />

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={filteredAccountingAccounts}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
                scroll={{ x: true }}
                locale={{
                    emptyText: <Empty description="No hay cuentas" />
                }}
            />
        </>
    );
}
