"use client";

import { Layout, Menu } from "antd";
import {
    DashboardOutlined,
    ApartmentOutlined,
} from "@ant-design/icons";
import { useRouter, usePathname } from "next/navigation";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useEffect } from "react";

const { Sider } = Layout;

interface SidebarProps {
    collapsed: boolean;
    setHeaderTitle: (headerTitle: string) => void;
}

const routes: ItemType<MenuItemType>[] = [
    {
        key: "/",
        icon: <DashboardOutlined />,
        label: "Dashboard",
    },
    {
        key: "/department",
        icon: <ApartmentOutlined />,
        label: "Departmentos",
    }
];

export default function Sidebar({ collapsed, setHeaderTitle }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        let route = routes.find(route => route!.key === pathname)
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
                items={routes}
            />
        </Sider>
    );
}