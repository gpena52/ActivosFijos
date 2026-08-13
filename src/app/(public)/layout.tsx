import { AntdRegistry } from "@ant-design/nextjs-registry";
import Providers from "../../providers/providers";
import { NotificationProvider } from "@/components/NotificationProvider";
import { App as AntdApp } from "antd";
import { poppins } from "@/constants/poppins";
import "../styles/globals.scss"
import PublicLayout from "@/components/public/PublicLayout";
import { DarkModeProvider } from "@/providers/darkModeProvider";
export { metadata } from "@/constants/metadata";

export default async function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <PublicLayout>{children}</PublicLayout>
    );
}