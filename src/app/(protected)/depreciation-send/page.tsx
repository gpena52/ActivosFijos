"use client"

import DataFilters from "@/components/general/DataFilters";
import { DepreciationRecordDto } from "@/dtos";
import { SearchOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Col, Empty, Flex, Row, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Dayjs } from "dayjs";
import { useState } from "react";

export default function DepreciationSend() {
    const columns: ColumnsType<DepreciationRecordDto> = [
        {
            title: "Cuenta debito",
            dataIndex: "debitAccountName",
            key: "debitAccountName",
        },
        {
            title: "Cuenta credito",
            dataIndex: "creditAccountName",
            key: "creditAccountName",
        },
        {
            title: "Fecha",
            dataIndex: "processDate",
            key: "processDate",
        },
        {
            title: "Valor de depreciacion",
            dataIndex: "depreciatedAmount",
            key: "depreciatedAmount",
        },
        {
            title: "Activo Fijo",
            dataIndex: "fixedAssetId",
            key: "fixedAssetId",
        }
    ];

    const [registrationDateRange, setRegistrationDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    const onClearFilter = () => {
        setRegistrationDateRange(null);
    };

    return (
        <>
            <DataFilters
                dateRange={{
                    value: registrationDateRange,
                    onChange: setRegistrationDateRange,
                    placeholder: ["Registro desde", "Registro hasta"]
                }}
                onClear={onClearFilter}
            >
                <Row gutter={[16, 0]}>
                    <Col>
                        <Button icon={<SearchOutlined />} className="mb-3 mt-3" onClick={() => { }}>
                            Buscar
                        </Button>
                    </Col>

                    <Col>
                        <Button icon={<SendOutlined />} className="mb-3 mt-3" onClick={() => { }}>
                            Enviar
                        </Button>
                    </Col>
                </Row>
            </DataFilters>

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={[]}
                pagination={{ pageSize: 10 }}
                // loading={isLoading}
                loading={false}
                scroll={{ x: true }}
                locale={{
                    emptyText: <Empty description="No hay registros" />
                }}
            />
        </>
    );
}