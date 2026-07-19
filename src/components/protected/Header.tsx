"use client";

import { LoggedDto } from "@/dtos";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Space, Avatar, Button, Typography, Dropdown, MenuProps } from "antd";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

const { Header } = Layout;

interface HeaderProps {
    collapsed: boolean;
    user: LoggedDto;
    headerTitle: string;
    setCollapsed: (collapsed: boolean) => void;
}

const items: MenuProps["items"] = [
    { key: "logout", label: "Cerrar Sesión", danger: true, onClick: () => signOut() },
];

export default function AppHeader({ collapsed, user, headerTitle, setCollapsed }: HeaderProps) {
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

            <Dropdown
                menu={{ items }}
                trigger={["click"]}
            >
                <Space className="pointer">
                    <Avatar>{user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase()}</Avatar>
                    <Typography.Text>{user.firstName} {user.lastName}</Typography.Text>
                </Space>
            </Dropdown>
        </Header>
    );
}