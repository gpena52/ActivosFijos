import { ErrorResponseDto } from "@/dtos/error-response.dto";

export async function fetcher<T>(
    url: string,
    options?: RequestInit
): Promise<ErrorResponseDto<T>> {
    const response = await fetch(url, {
        headers: {
            "Content-Type": "application/json",
            ...options?.headers,
        },
        ...options,
    });

    // if (!response.ok) {
    //     const error = await response.text();
    //     throw new Error(error || "Request failed");
    // }

    return {
        data: await response.json(),
        ok: response.ok,
        message: response.statusText,
        code: response.status,
    };
}