import { poppins } from "@/constants/poppins";
import { DarkModeProvider } from "@/providers/darkModeProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "../providers/providers";
import { NotificationProvider } from "@/components/NotificationProvider";
import { App as AntdApp } from "antd";
import Script from "next/script";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className={poppins.className} suppressHydrationWarning>
            <body>
                <AntdRegistry>
                    <DarkModeProvider>
                        <Providers>
                            <AntdApp>
                                <NotificationProvider />
                                {children}
                            </AntdApp>
                        </Providers>
                    </DarkModeProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}