"use client";

import CenteredCard from "@/components/public/CenteredCard";
import { rules } from "@/rules";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import useRegister from "./useRegister";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoadingOutlined } from "@ant-design/icons";

const title = "Registre su usuario"

interface FormRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {

    const {
        createAndLogin
    } = useRegister();

    const router = useRouter();

    const [form] = Form.useForm();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [validatePassword, setValidatePassword] = useState(false);

    const onFinish = async (values: FormRegisterDto) => {
        setIsLoading(true);
        await createAndLogin({
            firstName: values.firstName,
            lastName: values.lastName,
            email: values.email,
            password: values.password
        })
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
                        label="Nombre"
                        name="firstName"
                        rules={[rules.required("Nombre")]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Apellido"
                        name="lastName"
                        rules={[rules.required("Apellido")]}
                    >
                        <Input />
                    </Form.Item>

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

                    <Form.Item
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        dependencies={["password"]}
                        rules={[rules.required("Confirmar Contraseña"), validatePassword ? rules.equalToField("password", "Las contraseñas no coinciden") : {}]}
                        validateFirst
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button onClick={() => setValidatePassword(true)} type="primary" htmlType="submit" block disabled={isLoading}>
                        Registrarse {isLoading && <LoadingOutlined spin />}
                    </Button>
                </Form>
                <Link href="/login" className="w-full">
                    <div className="text-center mt-4">¿Ya tienes cuenta? Inicia Sesión</div>
                </Link>
            </CenteredCard>
        </>
    );
}