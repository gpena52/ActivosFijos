export interface ErrorResponseDto<T> {
    data: T;
    ok: boolean;
    errorMessage: string;
    code: number;
}