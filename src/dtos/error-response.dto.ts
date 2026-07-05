export interface ErrorResponseDto<T> {
    data: T;
    ok: boolean;
    message: string;
    code: number;
}