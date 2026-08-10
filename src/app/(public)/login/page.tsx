"use client";

import CenteredCard from "@/components/public/CenteredCard";
import { rules } from "@/rules";
import { Button, Form, Input } from "antd";
import Link from "next/link";
import useLogin from "./useLogin";
import { LoginDto } from "@/dtos";
import { useRouter } from "next/navigation";
import { notify } from "@/utils/notification";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const title = "Inicie Sesión";

export default function Login() {

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { login } = useLogin();

    const router = useRouter();

    const [form] = Form.useForm();

    const onFinish = async (values: LoginDto) => {
        setIsLoading(true);
        const result = await login(values);

        if (result?.ok) {
            router.push("/dashboard");
        } else {
            notify.error("Error", "Credenciales invalidas");
        }
        setIsLoading(false);
    };

    return (
        <>
            <CenteredCard title={title}>
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                >
                    <Form.Item
                        label="Correo"
                        name="email"
                        rules={[rules.required("Correo"), rules.email]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Contraseña"
                        name="password"
                        rules={[rules.required("Contraseña")]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button type="primary" htmlType="submit" block disabled={isLoading}>
                        Iniciar Sesión {isLoading && <LoadingOutlined spin />}
                    </Button>
                </Form>
                <Link href="/register" className="w-full">
                    <div className="text-center mt-4">¿No tienes cuenta? Registrate</div>
                </Link>
            </CenteredCard>
        </>
    );
}