export { default } from "next-auth/middleware";

export const config = {
    matcher: [
        "/dashboard",
        "/department",
        "/employee",
        "/accounting-account",
        "/asset-type",
        "/fixed-asset",
    ],
};