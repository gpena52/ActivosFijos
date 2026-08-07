import { Prisma } from "@/generated/prisma/client";

export const prismaDecimalErrorMessage = {
    message: "Invalid decimal"
}

export const prismaDecimalValidation = (value: number) => {
    try {
        new Prisma.Decimal(value);
        return true;
    } catch {
        return false;
    }
}