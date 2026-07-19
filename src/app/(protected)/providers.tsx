"use client";

import AntdApp from "@/components/general/antd";
import { App, ConfigProvider, theme } from "antd";
import { SessionProvider } from "next-auth/react";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <SessionProvider>
            <ConfigProvider
                theme={{
                    algorithm: theme.defaultAlgorithm,
                    token: {
                        colorPrimary: "#1677ff",
                        borderRadius: 8,
                    },
                }}
            >
                <App>
                    <AntdApp />
                    {children}
                </App>
            </ConfigProvider>
        </SessionProvider>
    );
}