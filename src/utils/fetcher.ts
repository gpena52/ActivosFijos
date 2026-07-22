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

    const json = await response.json();

    return {
        data: json,
        ok: response.ok,
        errorMessage: !response.ok && json?.message,
        code: response.status,
    };
}