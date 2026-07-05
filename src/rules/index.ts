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

    email: {
        type: "email" as const,
        message: "Ingrese un email valido",
    },
};