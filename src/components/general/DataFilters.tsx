"use client";

import { Button, Col, DatePicker, Input, Row, Select } from "antd";
import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import type { Dayjs } from "dayjs";

const { RangePicker } = DatePicker;

export interface SelectFilterConfig<T = any> {
    key: string;
    placeholder: string;
    value: T | undefined;
    onChange: (value: T | undefined) => void;
    options: { label: string; value: T }[];
    width?: number;
}

export interface DateRangeFilterConfig {
    value: [Dayjs, Dayjs] | null;
    onChange: (value: [Dayjs, Dayjs] | null) => void;
    placeholder?: [string, string];
    format?: string;
    width?: number;
    onOpen?: () => void;
    onClear?: () => void;
}

interface DataFiltersProps {
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    searchPlaceholder?: string;
    selects?: SelectFilterConfig[];
    dateRange?: DateRangeFilterConfig;
    onClear: () => void;
    children?: React.ReactNode;
}

/**
 * Barra de filtros reutilizable para las tablas de los CRUD's.
 * - Un input de búsqueda que filtra por todos los campos de texto.
 * - Un Select por cada campo que en el formulario se llena con Select.
 * - Un RangePicker para los campos de fecha (solo si el CRUD tiene fecha).
 */
export default function DataFilters({
    searchValue,
    onSearchChange,
    searchPlaceholder = "Buscar...",
    selects = [],
    dateRange,
    onClear,
    children
}: DataFiltersProps) {

    const hasActiveFilters =
        !!searchValue ||
        selects.some(select => select.value !== undefined && select.value !== null) ||
        !!dateRange?.value;

    return (
        <Row gutter={[16, 12]} className="mb-3 mt-3" align="middle">
            {onSearchChange && <Col xs={24} md={8} lg={6}>
                <Input
                    allowClear
                    prefix={<SearchOutlined />}
                    placeholder={searchPlaceholder}
                    value={searchValue}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                />
            </Col>}

            {selects.map((select) => (
                <Col xs={24} md={8} lg={select.width ?? 5} key={select.key}>
                    <Select
                        allowClear
                        className="w-100"
                        placeholder={select.placeholder}
                        value={select.value}
                        onChange={select.onChange}
                        options={select.options}
                    />
                </Col>
            ))}

            {dateRange && (
                <Col xs={24} md={8} lg={dateRange.width ?? 6}>
                    <RangePicker
                        className="w-100"
                        value={dateRange.value}
                        onClear={dateRange.onClear}
                        onOpenChange={(open) => {
                            if (open) dateRange.onOpen?.();
                        }}
                        onChange={(dates) => {
                            if (dates && dates[0] && dates[1]) {
                                dateRange.onChange([dates[0], dates[1]]);
                            } else {
                                dateRange.onChange(null);
                            }
                        }}
                        format={dateRange.format ?? "DD-MM-YYYY"}
                        placeholder={dateRange.placeholder ?? ["Fecha desde", "Fecha hasta"]}
                    />
                </Col>
            )}

            {hasActiveFilters && (
                <Col>
                    <Button icon={<ReloadOutlined />} onClick={onClear}>
                        Limpiar filtros
                    </Button>
                </Col>
            )}
            {children && <Col>{children}</Col>}
        </Row>
    );
}
