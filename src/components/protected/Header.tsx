"use client";

import { DarkModeContext } from "@/contexts/darkModeContext";
import { LoggedDto } from "@/dtos";
import { MenuFoldOutlined, MenuUnfoldOutlined, MoonOutlined, SunOutlined } from "@ant-design/icons";
import { Layout, Space, Avatar, Button, Typography, Dropdown, MenuProps, Switch, Flex } from "antd";
import { signOut } from "next-auth/react";
import { useContext, useState } from "react";

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

    const { isDark, toggleDarkMode } = useContext(DarkModeContext)!;

    return (
        <Header
            style={{
                padding: "0 24px",
                height: "auto",
            }}
            className={isDark ? "bg-dark" : "bg-light"}
        >
            <Flex wrap="wrap" align="center" justify="center" style={{ width: "100%" }}>
                <Button
                    type="text"
                    icon={
                        collapsed
                            ? <MenuUnfoldOutlined />
                            : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                />

                <h3 style={{ margin: 0, flex: 1, textAlign: "center" }}>{headerTitle}</h3>

                <Space wrap style={{ justifyContent: "center" }}>
                    <Switch
                        checked={isDark}
                        onChange={toggleDarkMode}
                        checkedChildren={<MoonOutlined />}
                        unCheckedChildren={<SunOutlined />}
                    />

                    <Dropdown
                        menu={{ items }}
                        trigger={["click"]}
                    >
                        <Space className="pointer">
                            <Avatar>{user.firstName.substring(0, 1).toUpperCase() + user.lastName.substring(0, 1).toUpperCase()}</Avatar>
                            <Typography.Text>{user.firstName} {user.lastName}</Typography.Text>
                        </Space>
                    </Dropdown>
                </Space>
            </Flex>
        </Header>
    );
}