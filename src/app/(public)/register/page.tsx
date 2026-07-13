"use client";

import CenteredCard from "@/components/public/CenteredCard";
import { rules } from "@/rules";
import { Button, Form, Input } from "antd";
import { useState } from "react";

const title = "Registre su usuario"

interface FormRegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function Register() {

    const [form] = Form.useForm();
    const [validatePassword, setValidatePassword] = useState(false);

    const onFinish = (values: FormRegisterDto) => {
        console.log(values);
        clearForm();
    };

    const clearForm = () => {
        form.resetFields();
        form.setFieldsValue({});
        setValidatePassword(false);
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
                        rules={[rules.required("Confirmar Contraseña"), validatePassword ? rules.equalToField("password", "Las contraseñas no coinciden") : {}]}
                        validateFirst
                    >
                        <Input.Password />
                    </Form.Item>

                    <Button onClick={() => setValidatePassword(true)} type="primary" htmlType="submit" block>
                        Registrarse
                    </Button>
                </Form>
            </CenteredCard>
        </>
    );
}