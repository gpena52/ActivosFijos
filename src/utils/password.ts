import bcrypt from "bcrypt";

export const hash = async (password: string) => {
    return await bcrypt.hash(password, 12)
}

export const verify = async (password: string, hashed: string) => {
    return await bcrypt.compare(password, hashed)
}