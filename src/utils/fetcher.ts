import { ErrorResponseDto } from "@/dtos/error-response.dto";

export async function fetcher<T>(
    url: string,
    options?: RequestInit
): Promise<ErrorResponseDto<T>> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY!,
            ...options?.headers,
        },
        ...options,
    });

    return {
        data: await response.json(),
        ok: response.ok,
        message: response.statusText,
        code: response.status,
    };
}