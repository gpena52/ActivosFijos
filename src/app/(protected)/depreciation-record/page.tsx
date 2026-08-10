"use client"

import DataFilters from "@/components/general/DataFilters";
import { DepreciationRecordDto, FixedAssetDto, JournalEntryDto } from "@/dtos";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Flex, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs, { Dayjs } from "dayjs";
import { useState } from "react";
import useDepreciationSend from "./useDepreciationSend";
import { JournalEntryRequest } from "@/dtos/journal-entry-request.dto";

export default function DepreciationSend() {

    const {
        isLoading,
        areAccountsLoading,
        accountingServiceAccounts,
        getAllByDateRange,
        sendToAccounting,
        update
    } = useDepreciationSend();

    const [showLoading, setShowLoading] = useState(false);
    const [disabledSend, setDisabledSend] = useState(true);
    const [disabledSearch, setDisabledSearch] = useState(true);

    const [depreciationRecords, setDepreciationRecords] = useState<DepreciationRecordDto[]>([]);

    const [registrationDateRange, setRegistrationDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    const columns: ColumnsType<DepreciationRecordDto> = [
        {
            title: "Cuenta Debito",
            dataIndex: "debitAccountName",
            key: "debitAccountName",
            render: (_: any, depreciationRecord: DepreciationRecordDto) => {
                const accountingServiceAccount = accountingServiceAccounts.find(asa => asa.id == depreciationRecord.fixedAsset?.assetType?.purchaseAccount?.accountingServiceAccountId);
                return `${accountingServiceAccount?.codigo} - ${accountingServiceAccount?.nombre}`;
            }
        },
        {
            title: "Cuenta Credito",
            dataIndex: "creditAccountName",
            key: "creditAccountName",
            render: (_: any, depreciationRecord: DepreciationRecordDto) => {
                const accountingServiceAccount = accountingServiceAccounts.find(asa => asa.id == depreciationRecord.fixedAsset?.assetType?.depreciationAccount?.accountingServiceAccountId);
                return `${accountingServiceAccount?.codigo} - ${accountingServiceAccount?.nombre}`;
            }
        },
        {
            title: "Fecha",
            dataIndex: "processDate",
            key: "processDate",
            render: (processDate: Date) => dayjs(processDate).format("DD-MM-YYYY")
        },
        {
            title: "Valor de depreciacion",
            dataIndex: "accumulatedDepreciation",
            key: "accumulatedDepreciation",
        },
        {
            title: "Activo Fijo",
            dataIndex: "fixedAsset",
            key: "fixedAsset",
            render: (fixedAsset: FixedAssetDto) => fixedAsset.name
        }
    ];

    const onSearch = async () => {
        setShowLoading(true);
        setDisabledSend(false);
        setDepreciationRecords(await getAllByDateRange(registrationDateRange![0].toDate(), registrationDateRange![1].toDate()));
    }

    const onSend = async () => {
        setDisabledSearch(true);
        setDisabledSend(true);
        const responses: JournalEntryDto[] = await sendToAccounting(depreciationRecords);
        await update(responses);
        onClearFilter();
    }

    const onChange = (value: [Dayjs, Dayjs] | null) => {
        setRegistrationDateRange(value);
        setDisabledSearch(false);
        setDisabledSend(true);
    }

    const onClearFilter = () => {
        setRegistrationDateRange(null);
        setDisabledSearch(true);
        setDisabledSend(true);
        setDepreciationRecords([]);
    };

    return (
        <>
            <DataFilters
                dateRange={{
                    value: registrationDateRange,
                    onChange: onChange,
                    onOpen: () => { setDisabledSend(true) },
                    onClear: onClearFilter,
                    placeholder: ["Registro desde", "Registro hasta"]
                }}
                onClear={onClearFilter}
            >
                <Row gutter={[16, 0]}>
                    <Col>
                        <Button icon={<SearchOutlined />} className="mb-3 mt-3" onClick={onSearch} disabled={disabledSearch}>
                            Buscar
                        </Button>
                    </Col>

                    <Col>
                        <Button icon={<SendOutlined />} className="mb-3 mt-3" onClick={onSend} disabled={disabledSend}>
                            Enviar
                        </Button>
                    </Col>
                </Row>
            </DataFilters>

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={areAccountsLoading ? [] : depreciationRecords}
                pagination={{ pageSize: 10 }}
                loading={isLoading ? isLoading : showLoading && areAccountsLoading}
                scroll={{ x: true }}
                locale={{
                    emptyText: <Empty description="No hay registros" />
                }}
            />
        </>
    );
}