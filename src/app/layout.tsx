import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./styles/globals.scss";
import { Poppins } from "next/font/google";
import Providers from "./providers";
import AppLayout from "@/components/layout/AppLayout";
import { App as AntdApp } from "antd";
import { NotificationProvider } from "@/components/NotificationProvider";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Activos Fijos",
  description: "Gestion de activos fijos con Next.js, TypeScript y Ant Design"
};

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
              <AppLayout>{children}</AppLayout>
            </AntdApp>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
