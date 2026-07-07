import { validateIdentification } from "@/utils/validateIdentification";

// validation.ts
export const rules = {
    required: (field: string) => ({
        required: true,
        message: `${field} es requerido`,
    }),

    number: () => ({
        pattern: /^\d+$/,
        message: "No se permiten valores no numericos",
    }),

    min: (min: number) => ({
        min,
        type: "number" as const,
        message: `Debe ser mayor o igual a ${min}`,
    }),

    email: {
        type: "email" as const,
        message: "Ingrese un email valido",
    },

    indentification: {
        validator: (_: any, value: string) => {
            console.log({ _, value })
            if (!validateIdentification(value)) {
                return Promise.reject("Ingrese una cedula valida")
            }

            return Promise.resolve();
        }
    }
};