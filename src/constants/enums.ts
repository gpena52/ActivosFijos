import type { AccountType, MovementType, PersonType } from "@/generated/prisma/enums";

export const accountTypeLabels: Record<AccountType, string> = {
    ASSET: "Activo",
    LIABILITY: "Pasivo",
    EQUITY: "Capital",
    REVENUE: "Ingreso",
    EXPENSE: "Gasto",
};

export const personTypeLabels: Record<PersonType, string> = {
    INDIVIDUAL: "Individual",
    COMPANY: "Empresa",
};

export const movementTypeLabels: Record<MovementType, string> = {
    DB: "Debito",
    CR: "Credito",
};
