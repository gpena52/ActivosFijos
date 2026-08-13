"use client";

import { Grid, Layout, Menu } from "antd";
import {
    DashboardOutlined,
    ApartmentOutlined,
    BookOutlined,
    AppstoreOutlined,
    BankOutlined,
    UserOutlined,
    SendOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import type { ReactNode } from "react";
import type { ItemType, MenuItemType } from "antd/es/menu/interface";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setHeaderTitle: (headerTitle: string) => void;
}

interface AppRoute {
    key: string;
    icon: ReactNode;
    label: string;
}

const routes: AppRoute[] = [
    {
        key: "/dashboard",
        icon: <DashboardOutlined />,
        label: "Dashboard",
    },
    {
        key: "/department",
        icon: <ApartmentOutlined />,
        label: "Departmentos",
    },
    {
        key: "/employee",
        icon: <UserOutlined />,
        label: "Empleados",
    },
    {
        key: "/accounting-account",
        icon: <BookOutlined />,
        label: "Cuentas",
    },
    {
        key: "/asset-type",
        icon: <AppstoreOutlined />,
        label: "Tipos de Activos",
    },
    {
        key: "/fixed-asset",
        icon: <BankOutlined />,
        label: "Activos Fijos",
    },
    {
        key: "/depreciation-record",
        icon: <SendOutlined />,
        label: "Envio de depreciaciones",
    },
];

const { useBreakpoint } = Grid;

export default function Sidebar({ collapsed, setHeaderTitle }: SidebarProps) {
    const screens = useBreakpoint();
    const router = useRouter();
    const pathname = usePathname();

    const isMobile = !screens.md;

    useEffect(() => {
        let route = routes.find(route => route.key === pathname)
        if (route) setHeaderTitle(route.label)
    })

    return (
        <Sider
            width={240}
            collapsedWidth={isMobile ? 0 : 110}
            collapsed={collapsed}
            trigger={null}
        >
            <div
                style={{
                    color: "#fff",
                    fontSize: 20,
                    textAlign: "center",
                    padding: 20,
                    fontWeight: "bold",
                }}
            >
                Activos Fijos
            </div>

            <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[pathname]}
                onClick={({ key }) => router.push(key)}
                items={routes as ItemType<MenuItemType>[]}
            />
        </Sider>
    );
}
