"use client";

import AntdApp from "@/components/general/antd";
import { App, ConfigProvider, theme } from "antd";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const seconds = 60;
const refreshMinutes = Number(process.env.NEXT_PUBLIC_REFRESH_MINUTES);
console.log(refreshMinutes)
const interval = seconds * refreshMinutes;

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibility = () => {
            setIsVisible(document.visibilityState === 'visible');
        };

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return (
        <SessionProvider
            refetchInterval={isVisible ? interval : 0}
            refetchOnWindowFocus={true}
        >
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