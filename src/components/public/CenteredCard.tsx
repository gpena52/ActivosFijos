"use client";

import { Card, Flex, theme } from "antd";
import { ReactNode } from "react";

interface CenteredCardProps {
    title: string;
    children: ReactNode;
}

export default function CenteredCard({ title, children }: CenteredCardProps) {

    const { token } = theme.useToken();

    return (
        <>
            <Flex
                justify="center"
                align="center"
                style={{
                    minHeight: "100vh",
                    backgroundColor: token.colorPrimary,
                }}
            >
                <Card
                    title={title}
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
        </>
    );
}