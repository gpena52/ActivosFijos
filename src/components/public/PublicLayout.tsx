"use client";

import { Card, Flex, theme } from "antd";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { token } = theme.useToken();

    return (
        <Flex
            justify="center"
            align="center"
            style={{
                backgroundColor: token.colorPrimary,
                minHeight: "100vh"
            }}
        >
            <Card
                title="User Profile"
                style={{
                    width: 350
                }}
                styles={{
                    title: {
                        textAlign: "center",
                    },
                }}
            >
                {children}
            </Card>
        </Flex>
    )
}