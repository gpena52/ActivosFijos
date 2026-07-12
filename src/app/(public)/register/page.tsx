import { Card, Flex } from "antd";

export default function Register() {
    return (
        <>
            <Flex
                justify="center"
                align="center"
                style={{
                    minHeight: "100vh"
                }}
            >
                <Card
                    title="Registre su usuario"
                    style={{
                        width: 350
                    }}
                    styles={{
                        title: {
                            textAlign: "center",
                        },
                    }}
                >
                    <p>Aqui va el formulario</p>
                </Card>
            </Flex >
        </>
    );
}