"use client";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Space, Avatar, Button } from "antd";

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    headerTitle: string;
    setCollapsed: (collapsed: boolean) => void;
}

export default function AppHeader({ collapsed, headerTitle, setCollapsed }: HeaderProps) {
    return (
        <Header
            style={{
                background: "#fff",
                padding: "0 24px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
            }}
        >
            <Button
                type="text"
                icon={
                    collapsed
                        ? <MenuUnfoldOutlined />
                        : <MenuFoldOutlined />
                }
                onClick={() => setCollapsed(!collapsed)}
            />

            <h3 style={{ margin: 0 }}>{headerTitle}</h3>

            <Space>
                <Avatar>G</Avatar>
            </Space>
        </Header>
    );
}