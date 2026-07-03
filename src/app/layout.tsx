import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";
import Providers from "./providers";
import AppLayout from "@/components/layout/AppLayout";

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
            <AppLayout>
              {children}
            </AppLayout>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
