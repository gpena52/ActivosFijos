import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.scss"
import Providers from "./providers";
import ProtectedLayout from "@/components/protected/ProtectedLayout";
import { App as AntdApp } from "antd";
import { NotificationProvider } from "@/components/NotificationProvider";
import { poppins } from "@/constants/poppins";
export { metadata } from "@/constants/metadata";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={poppins.className}>
      <body>
        <AntdRegistry>
          <Providers>
            <AntdApp>
              <NotificationProvider />
              <ProtectedLayout>{children}</ProtectedLayout>
            </AntdApp>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
