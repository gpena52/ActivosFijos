import { AntdRegistry } from "@ant-design/nextjs-registry";
import "../styles/globals.scss"
import Providers from "../../providers/providers";
import ProtectedLayout from "@/components/protected/ProtectedLayout";
import { App as AntdApp } from "antd";
import { NotificationProvider } from "@/components/NotificationProvider";
import { poppins } from "@/constants/poppins";
import { requireAuth } from "@/utils/auth";
import { LoggedDto } from "@/dtos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth/config";
import { DarkModeContext } from "@/contexts/darkModeContext";
import { DarkModeProvider } from "@/providers/darkModeProvider";
export { metadata } from "@/constants/metadata";

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <ProtectedLayout user={session!.user as LoggedDto}>{children}</ProtectedLayout>
  );
}
