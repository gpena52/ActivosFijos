import { validateIdentification } from "@/utils/validateIdentification";
import { Rule } from "antd/es/form";

// validation.ts
export const rules = {
    required: (field: string) => ({
        required: true,
        message: `El campo ${field} es requerido`,
    }),

    email: {
        type: "email" as const,
        message: "Ingrese un correo valido",
    },

    number: {
        pattern: /^\d+$/,
        message: "No se permiten valores no numericos",
    },

    min: (min: number) => ({
        min,
        type: "number" as const,
        message: `Debe ser mayor o igual a ${min}`,
    }),

    indentification: {
        validator: (_: any, value: string) => {
            console.log({ _, value })
            if (!validateIdentification(value)) {
                return Promise.reject("Ingrese una cedula valida")
            }

            return Promise.resolve();
        }
    },

    greaterOrEqualThan: (
        otherField: string,
        message: string,
    ): Rule =>
        ({ getFieldValue }) => ({
            async validator(_, value: number) {
                const otherValue = Number(getFieldValue(otherField));

                if (!otherValue || !value || value >= otherValue) {
                    return;
                }

                throw new Error(`${message} ${otherValue}`);
            },
        }),

    lesserOrEqualThan: (
        otherField: string,
        message: string,
    ): Rule =>
        ({ getFieldValue }) => ({
            async validator(_, value: number) {
                const otherValue = Number(getFieldValue(otherField));

                if (!otherValue || !value || value <= otherValue) {
                    return;
                }

                throw new Error(`${message} ${otherValue}`);
            },
        }),

    equalToField: (
        otherField: string,
        message: string,
    ): Rule =>
        ({ getFieldValue }) => ({
            async validator(_, value) {
                if (value === getFieldValue(otherField)) {
                    return Promise.resolve();
                }
                return Promise.reject(
                    new Error(message)
                );
            }
        })
};