"use client";

import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    ApartmentOutlined,
    BookOutlined,
    AppstoreOutlined,
    BankOutlined,
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
        key: "/",
        icon: <DashboardOutlined />,
        label: "Dashboard",
    },
    {
        key: "/department",
        icon: <ApartmentOutlined />,
        label: "Departmentos",
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
];

export default function Sidebar({ collapsed, setHeaderTitle }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let route = routes.find(route => route.key === pathname)
        if (route) setHeaderTitle(route.label)
    })

    return (
        <Sider
            width={240}
            collapsedWidth={110}
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
