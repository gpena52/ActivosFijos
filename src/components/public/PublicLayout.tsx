"use client";

import { Card, Flex, theme } from "antd";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = theme.useToken();

    return (
        <div
            style={{
                backgroundColor: token.colorPrimary,
            }}
        >
            {children}
        </div>
    )
}