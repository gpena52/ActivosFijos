"use client";

import AntdApp from "@/components/general/antd";
import { App, ConfigProvider, theme } from "antd";

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
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
    );
}