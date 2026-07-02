"use client";

import {
  AppstoreOutlined,
  AuditOutlined,
  BankOutlined,
  BarcodeOutlined,
  BellOutlined,
  DashboardOutlined,
  FileSearchOutlined,
  PlusOutlined,
  ToolOutlined
} from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Button,
  Card,
  Col,
  ConfigProvider,
  Flex,
  Layout,
  Menu,
  Progress,
  Row,
  Space,
  Statistic,
  Table,
  Tag,
  Typography,
  theme
} from "antd";
import type { ColumnsType } from "antd/es/table";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

type Asset = {
  key: string;
  code: string;
  name: string;
  department: string;
  status: "Activo" | "Mantenimiento" | "Asignado";
  value: string;
};

const assets: Asset[] = [
  {
    key: "1",
    code: "AF-1024",
    name: "Laptop Dell Latitude 5440",
    department: "Contabilidad",
    status: "Asignado",
    value: "RD$ 68,500"
  },
  {
    key: "2",
    code: "AF-1108",
    name: "Servidor Lenovo ThinkSystem",
    department: "Tecnologia",
    status: "Activo",
    value: "RD$ 245,000"
  },
  {
    key: "3",
    code: "AF-1182",
    name: "Impresora Multifuncional HP",
    department: "Administracion",
    status: "Mantenimiento",
    value: "RD$ 39,900"
  },
  {
    key: "4",
    code: "AF-1240",
    name: "Proyector Epson PowerLite",
    department: "Operaciones",
    status: "Activo",
    value: "RD$ 52,300"
  }
];

const columns: ColumnsType<Asset> = [
  {
    title: "Codigo",
    dataIndex: "code",
    key: "code",
    render: (code: string) => <Text strong>{code}</Text>
  },
  {
    title: "Activo",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "Departamento",
    dataIndex: "department",
    key: "department"
  },
  {
    title: "Estado",
    dataIndex: "status",
    key: "status",
    render: (status: Asset["status"]) => {
      const color = status === "Activo" ? "green" : status === "Asignado" ? "blue" : "orange";
      return <Tag color={color}>{status}</Tag>;
    }
  },
  {
    title: "Valor",
    dataIndex: "value",
    key: "value",
    align: "right"
  }
];

export default function Home() {
  return (
    <p>Soy la pantalla</p>
  );
}
