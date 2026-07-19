import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "../(protected)/providers";
import { NotificationProvider } from "@/components/NotificationProvider";
import { App as AntdApp } from "antd";
import { poppins } from "@/constants/poppins";
import "../styles/globals.scss"
import PublicLayout from "@/components/public/PublicLayout";
import { notRequireAuth } from "@/utils/auth";
export { metadata } from "@/constants/metadata";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    const session = await notRequireAuth();

    return (
        <html lang="es" className={poppins.className}>
            <body>
                <AntdRegistry>
                    <Providers>
                        <AntdApp>
                            <NotificationProvider />
                            <PublicLayout>{children}</PublicLayout>
                        </AntdApp>
                    </Providers>
                </AntdRegistry>
            </body>
        </html>
    );
}