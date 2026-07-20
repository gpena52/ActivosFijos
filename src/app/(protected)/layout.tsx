import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.scss"
import Providers from "./providers";
import ProtectedLayout from "@/components/protected/ProtectedLayout";
import { App as AntdApp } from "antd";
import { NotificationProvider } from "@/components/NotificationProvider";
import { poppins } from "@/constants/poppins";
import { requireAuth } from "@/utils/auth";
import { LoggedDto } from "@/dtos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
export { metadata } from "@/constants/metadata";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="es" className={poppins.className}>
      <body>
        <AntdRegistry>
          <Providers>
            <AntdApp>
              <NotificationProvider />
              <ProtectedLayout user={session!.user as LoggedDto}>{children}</ProtectedLayout>
            </AntdApp>
          </Providers>
        </AntdRegistry>
      </body>
    </html>
  );
}
