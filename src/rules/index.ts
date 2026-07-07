// validation.ts
export const rules = {
    required: (field: string) => ({
        required: true,
        message: `${field} es requerido`,
    }),

    number: () => ({
        pattern: /^\d+$/,
        message: "Ingrese un numero valido",
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
};