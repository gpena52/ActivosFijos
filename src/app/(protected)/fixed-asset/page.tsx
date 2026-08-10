"use client"

import { DepreciationRecordDto, FixedAssetDto } from "@/dtos";
import { Button, Col, DatePicker, Empty, Form, GetRef, Input, InputNumber, Modal, Row, Select, Skeleton, Space, Typography } from "antd";
import { useMemo, useRef, useState } from "react";
import useFixedAsset from "./useFixedAsset";
import Table, { ColumnsType } from "antd/es/table";
import { CalculatorOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { rules } from "@/rules";
import TextArea from "antd/es/input/TextArea";
import dayjs, { Dayjs } from "dayjs";
import DataFilters from "@/components/general/DataFilters";

interface FixedAssetFormValues extends FixedAssetDto {
    dateValue?: dayjs.Dayjs;
}

const gutter = 16;
const fullWidth = 24;
const halfWidth = 12;
const dateFormat = 'DD-MM-YYYY';
const precision = 2;
const step = 0.01;

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

    const tableRef = useRef<GetRef<typeof Table>>(null);
    const abortControllerRef = useRef<AbortController | null>(null);

    const [form] = Form.useForm();
    const [modalOpen, setModalOpen] = useState(false);
    const [isEditLoading, setIsEditLoading] = useState(false);
    const [depreciationModalOpen, setDepreciationModalOpen] = useState(false);
    const [isCalculatingDepreciation, setIsCalculatingDepreciation] = useState(false);
    const [currentFixedAsset, setCurrentFixedAsset] = useState<FixedAssetDto | null>(null);
    const [accumulatedDepreciationValues, setAccumulatedDepreciationValues] = useState<DepreciationRecordDto[]>([]);

    const [searchText, setSearchText] = useState("");
    const [departmentFilter, setDepartmentFilter] = useState<number>();
    const [assetTypeFilter, setAssetTypeFilter] = useState<number>();
    const [registrationDateRange, setRegistrationDateRange] = useState<[Dayjs, Dayjs] | null>(null);

    const filteredFixedAssets = useMemo(() => {
        const term = searchText.trim().toLowerCase();

        return fixedAssets.filter(fixedAsset => {
            const matchesSearch = !term ||
                fixedAsset.name?.toLowerCase().includes(term) ||
                fixedAsset.description?.toLowerCase().includes(term);

            const matchesDepartment = !departmentFilter ||
                fixedAsset.departmentId === departmentFilter;

            const matchesAssetType = !assetTypeFilter ||
                fixedAsset.assetTypeId === assetTypeFilter;

            const matchesRegistrationDate = !registrationDateRange || (
                fixedAsset.registrationDate !== undefined &&
                dayjs(fixedAsset.registrationDate).valueOf() >= registrationDateRange[0].startOf("day").valueOf() &&
                dayjs(fixedAsset.registrationDate).valueOf() <= registrationDateRange[1].endOf("day").valueOf()
            );

            return matchesSearch && matchesDepartment && matchesAssetType && matchesRegistrationDate;
        });
    }, [fixedAssets, searchText, departmentFilter, assetTypeFilter, registrationDateRange]);

    const onClearFilters = () => {
        setSearchText("");
        setDepartmentFilter(undefined);
        setAssetTypeFilter(undefined);
        setRegistrationDateRange(null);
    };

    const calculateAccumulatedDepreciationValues = async (fixedAsset: FixedAssetDto, signal?: AbortSignal) => {
        setIsCalculatingDepreciation(true);

        const calculatedValues: DepreciationRecordDto[] = [];

        let purchaseValue = Number(fixedAsset.purchaseValue ?? 0);
        let depreciationValue = Number(fixedAsset.accumulatedDepreciation ?? 0);
        let currentValue = 0;
        let currentDate = fixedAsset?.registrationDate ? new Date(fixedAsset.registrationDate) : new Date();

        while (purchaseValue > currentValue) {
            currentValue += depreciationValue;

            if (purchaseValue < currentValue) currentValue = purchaseValue;

            calculatedValues.push({
                processDate: new Date(currentDate),
                depreciatedAmount: purchaseValue,
                accumulatedDepreciation: Math.round(currentValue * 100) / 100,
            });

            currentDate.setMonth(currentDate.getMonth() + 1);

            await new Promise(resolve => setTimeout(resolve, 0));
            signal?.throwIfAborted();
        }

        setIsCalculatingDepreciation(false);

        return calculatedValues
    }

    const accumulatedDepreciationColumns: ColumnsType<DepreciationRecordDto> = [
        {
            title: "Fecha",
            dataIndex: "processDate",
            key: "processDate",
            render: (processDate) => {
                return `${dayjs(processDate).format("DD-MM-YYYY")}`
            }
        },
        {
            title: "Valor de Compra",
            dataIndex: "depreciatedAmount",
            key: "depreciatedAmount",
        },
        {
            title: "Valor de Depreciacion",
            dataIndex: "accumulatedDepreciation",
            key: "accumulatedDepreciation",
        }
    ];

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
            title: "Valor de Depreciacion",
            dataIndex: "accumulatedDepreciation",
            key: "accumulatedDepreciation"
        },
        {
            title: "Acciones",
            dataIndex: "actions",
            key: "actions",
            render: (_, record: FixedAssetDto) => (
                <Space>
                    <Button color="green" variant="solid" icon={<CalculatorOutlined />} onClick={async () => await onDepreciationModalOpen(record)} />
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
        values.depreciationRecords = await calculateAccumulatedDepreciationValues(values);
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

    const onDepreciationModalOpen = async (fixedAsset: FixedAssetDto) => {
        try {
            setDepreciationModalOpen(true);
            setCurrentFixedAsset(fixedAsset);
            abortControllerRef.current = new AbortController();
            setAccumulatedDepreciationValues(fixedAsset.depreciationRecords ?? []);
        } catch (err) {
            if (err instanceof DOMException && err.name === "AbortError") {
                return;
            }

            throw err;
        }
    }

    const onDepreciationModalClose = () => {
        abortControllerRef.current?.abort();
        setDepreciationModalOpen(false);

        tableRef.current?.scrollTo({
            top: 0,
        });

        setAccumulatedDepreciationValues([])
    };

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
                ]}
                classNames={{
                    body: "scrollable-modal",
                }}
                getContainer={false}
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
                                {isEditLoading ? <Skeleton.Input active block /> : <DatePicker className="w-100" placeholder="Seleccione una Fecha de Registro" format={dateFormat} />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item dependencies={["accumulatedDepreciation"]} label="Valor de Compra" name="purchaseValue" rules={[rules.required("Valor de Compra"), rules.min(1), rules.greaterOrEqualThan("accumulatedDepreciation", "El valor de compra debe ser mayor o igual a")]} validateFirst>
                                {isEditLoading ? <Skeleton.Input active block /> : <InputNumber type="number" precision={precision} step={step} className="w-100" />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth} lg={halfWidth}>
                            <Form.Item dependencies={["purchaseValue"]} label="Valor de Depreciacion" name="accumulatedDepreciation" rules={[rules.required("Valor de Depreciacion"), rules.min(1), rules.lesserOrEqualThan("purchaseValue", "El valor de depreciacion debe ser menor o igual a")]} validateFirst>
                                {isEditLoading ? <Skeleton.Input active block /> : <InputNumber type="number" precision={precision} step={step} className="w-100" />}
                            </Form.Item>
                        </Col>

                        <Col span={fullWidth}>
                            <Form.Item label="Descripcion" name="description">
                                {isEditLoading ? <Skeleton.Input active block /> : <TextArea />}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>

            <Modal
                title={
                    <>
                        <Typography.Title level={4} className="text-center mt-2">
                            Depreciacion Acumulada
                        </Typography.Title>
                        <Typography.Title level={5} className="normal-title">
                            Activo Fijo: <strong>{currentFixedAsset?.name}</strong>
                        </Typography.Title>
                    </>
                }
                open={depreciationModalOpen}
                onCancel={onDepreciationModalClose}
                footer={null}
                classNames={{
                    body: "modal-height",
                }}
            >
                <Table
                    ref={tableRef}
                    rowKey="processDate"
                    className="mt-5"
                    columns={accumulatedDepreciationColumns}
                    dataSource={accumulatedDepreciationValues}
                    pagination={false}
                    loading={isCalculatingDepreciation}
                    scroll={{ x: true, y: "55vh" }}
                    locale={{
                        emptyText: <Empty description="Cargando..." />
                    }}
                />
            </Modal>

            <DataFilters
                searchValue={searchText}
                onSearchChange={setSearchText}
                searchPlaceholder="Buscar por nombre o descripción"
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
                        key: "assetType",
                        placeholder: "Filtrar por tipo de activo",
                        value: assetTypeFilter,
                        onChange: setAssetTypeFilter,
                        options: assetTypes.map(assetType => ({
                            label: assetType.name,
                            value: assetType.id!
                        }))
                    }
                ]}
                dateRange={{
                    value: registrationDateRange,
                    onChange: setRegistrationDateRange,
                    placeholder: ["Registro desde", "Registro hasta"]
                }}
                onClear={onClearFilters}
            />

            <Table
                rowKey="id"
                className="mt-5"
                columns={columns}
                dataSource={filteredFixedAssets}
                pagination={{ pageSize: 10 }}
                loading={isLoading}
                scroll={{ x: true }}
                locale={{
                    emptyText: <Empty description="No hay activos fijos" />
                }}
            />
        </>
    )
}