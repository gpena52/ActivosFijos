"use client";

import {
    ApartmentOutlined,
    TeamOutlined,
    BankOutlined,
    DesktopOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Skeleton, Statistic, Typography } from "antd";
import useDashboard from "./dashboard/useDashboard";

const { Title, Paragraph } = Typography;

export default function Dashboard() {

    const { statistics, isLoading } = useDashboard();

    return (
        <div style={{ padding: 10 }}>

            <Title level={2}>Activos Fijos</Title>

            <Paragraph type="secondary">
                Bienvenido al Sistema de Gestión de Activos Fijos.
                Aquí puede visualizar un resumen general de la información registrada.
            </Paragraph>

            <Row gutter={[16, 16]}>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        {
                            isLoading
                                ? <Skeleton active paragraph={false} />
                                : (
                                    <Statistic
                                        title="Empleados"
                                        value={statistics.employees}
                                        prefix={<TeamOutlined />}
                                    />
                                )
                        }
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        {
                            isLoading
                                ? <Skeleton active paragraph={false} />
                                : (
                                    <Statistic
                                        title="Departamentos"
                                        value={statistics.departments}
                                        prefix={<ApartmentOutlined />}
                                    />
                                )
                        }
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        {
                            isLoading
                                ? <Skeleton active paragraph={false} />
                                : (
                                    <Statistic
                                        title="Cuentas Contables"
                                        value={statistics.accountingAccounts}
                                        prefix={<BankOutlined />}
                                    />
                                )
                        }
                    </Card>
                </Col>

                <Col xs={24} sm={12} lg={6}>
                    <Card>
                        {
                            isLoading
                                ? <Skeleton active paragraph={false} />
                                : (
                                    <Statistic
                                        title="Activos Fijos"
                                        value={statistics.fixedAssets}
                                        prefix={<DesktopOutlined />}
                                    />
                                )
                        }
                    </Card>
                </Col>

            </Row>

        </div>
    );
}