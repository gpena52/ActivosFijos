"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import AppFooter from "./Footer";
import { useContext, useState } from "react";
import { LoggedDto } from "@/dtos";
import AuthGuard from "@/guards/AuthGuard";
import { DarkModeContext } from "@/contexts/darkModeContext";

const { Content } = Layout;

export default function ProtectedLayout({
    user,
    children,
}: {
    user: LoggedDto;
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("");

    const { isDark } = useContext(DarkModeContext)!;

    return (
        <Layout style={{ minHeight: "100vh" }} hasSider>
            <Sidebar collapsed={collapsed} setHeaderTitle={setHeaderTitle} />

            <Layout>
                <AppHeader collapsed={collapsed} user={user} setCollapsed={setCollapsed} headerTitle={headerTitle} />

                <Content
                    style={{
                        padding: 24,
                        margin: 24,
                        borderRadius: 8,
                    }}
                    className={isDark ? "bg-dark" : "bg-light"}
                >
                    <AuthGuard />
                    {children}
                </Content>

                <AppFooter />
            </Layout>
        </Layout>
    );
}