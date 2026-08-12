"use client";

import AntdApp from "@/components/general/antd";
import { App, ConfigProvider, theme } from "antd";
import { SessionProvider } from "next-auth/react";
import { useEffect, useState } from "react";

const seconds = 60;
const refreshMinutes = Number(process.env.NEXT_PUBLIC_EXPIRE_MINUTES);
const interval = seconds * refreshMinutes;

export default function Providers({
    children,
}: {
    children: React.ReactNode;
}) {

    const [isDark, setIsDark] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleVisibility = () => {
            setIsVisible(document.visibilityState === 'visible');
        };

        const media = window.matchMedia('(prefers-color-scheme: dark)');

        setIsDark(media.matches);

        const listener = (event: MediaQueryListEvent) => {
            setIsDark(event.matches);
        };

        media.addEventListener('change', listener);

        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            media.removeEventListener('change', listener);
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
                    algorithm: /*isDark ? theme.darkAlgorithm :*/ theme.defaultAlgorithm,
                    token: {
                        colorPrimary: "#1677ff",
                        borderRadius: 8,
                    },
                    components: {
                        Button: {
                            primaryShadow: "none",
                            defaultShadow: "none",
                            dangerShadow: "none",
                        },
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