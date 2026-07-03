"use client";

import { Layout } from "antd";
import Sidebar from "./Sidebar";
import AppHeader from "./Header";
import AppFooter from "./Footer";
import { useState } from "react";

const { Content } = Layout;

export default function AppLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [collapsed, setCollapsed] = useState(false);
    const [headerTitle, setHeaderTitle] = useState("");

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sidebar collapsed={collapsed} setHeaderTitle={setHeaderTitle} />

            <Layout>
                <AppHeader collapsed={collapsed} setCollapsed={setCollapsed} headerTitle={headerTitle} />

                <Content
                    style={{
                        padding: 24,
                        margin: 24,
                        background: "#fff",
                        borderRadius: 8,
                    }}
                >
                    {children}
                </Content>

                <AppFooter />
            </Layout>
        </Layout>
    );
}