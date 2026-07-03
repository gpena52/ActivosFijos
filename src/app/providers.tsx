"use client";

import { ConfigProvider, theme } from "antd";

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
            {children}
        </ConfigProvider>
    );
}