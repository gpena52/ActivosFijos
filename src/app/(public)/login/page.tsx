"use client";

import CenteredCard from "@/components/public/CenteredCard";
import { rules } from "@/rules";
import { Button, Form, Input } from "antd";
import Link from "next/link";

const title = "Inicie Sesión";

export default function Login() {

    const [form] = Form.useForm();

    const onFinish = async (values: any) => {
        console.log(values);
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

                    <Button type="primary" htmlType="submit" block>
                        Iniciar Sesión
                    </Button>
                </Form>
                <Link href="/register" className="w-full">
                    <div className="text-center mt-4">¿No tienes cuenta? Registrate</div>
                </Link>
            </CenteredCard>
        </>
    );
}